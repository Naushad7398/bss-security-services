/**
 * Centralized API client for BSS Security Services.
 * Communicates with the Spring Boot backend REST endpoints.
 */

// Base URL configurable via Vite environment variables with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Local storage keys for JWT authentication token across possible storage conventions
const PRIMARY_TOKEN_KEY = 'bss_auth_token';
const KNOWN_TOKEN_KEYS = [
  'bss_auth_token',
  'token',
  'jwt',
  'authToken',
  'accessToken',
  'bss_token',
  'auth_token',
  'access_token',
];
const REQUEST_TIMEOUT_MS = 15000;

/**
 * Clean raw token string: strip whitespace, surrounding quotes, and leading "Bearer "
 */
const sanitizeToken = (raw) => {
  if (!raw || typeof raw !== 'string') return null;
  let clean = raw.trim();
  if (clean.startsWith('"') && clean.endsWith('"')) {
    clean = clean.slice(1, -1).trim();
  }
  if (clean.toLowerCase().startsWith('bearer ')) {
    clean = clean.slice(7).trim();
  }
  return clean.length > 0 ? clean : null;
};

/**
 * Retrieve current JWT token from storage across all standard keys and web storages.
 */
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  // 1. Search localStorage across all known keys
  for (const key of KNOWN_TOKEN_KEYS) {
    try {
      const val = localStorage.getItem(key);
      const clean = sanitizeToken(val);
      if (clean) return clean;
    } catch {
      // Ignore storage access errors
    }
  }
  // 2. Search sessionStorage across all known keys
  for (const key of KNOWN_TOKEN_KEYS) {
    try {
      const val = sessionStorage.getItem(key);
      const clean = sanitizeToken(val);
      if (clean) return clean;
    } catch {
      // Ignore storage access errors
    }
  }
  return null;
};

/**
 * Persist JWT token across standard keys in storage for seamless cross-component consistency.
 */
export const setAuthToken = (token) => {
  if (typeof window === 'undefined') return;
  const clean = sanitizeToken(token);
  if (clean) {
    try {
      localStorage.setItem(PRIMARY_TOKEN_KEY, clean);
      localStorage.setItem('token', clean);
      localStorage.setItem('jwt', clean);
      sessionStorage.setItem(PRIMARY_TOKEN_KEY, clean);
      sessionStorage.setItem('token', clean);
    } catch {
      // Ignore storage errors
    }
  } else {
    clearAuthToken();
  }
};

/**
 * Remove JWT token from all storage locations and keys.
 */
export const clearAuthToken = () => {
  if (typeof window === 'undefined') return;
  for (const key of KNOWN_TOKEN_KEYS) {
    try {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    } catch {
      // Ignore
    }
  }
};

/**
 * Core HTTP request handler with automatic JSON serialization,
 * error handling, and JWT authorization header injection.
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  };

  // Attach JWT Authorization header if a token exists
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    delete headers['authorization'];
  }

  // Allow browser to manage multipart boundary when sending FormData
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const config = {
    ...options,
    headers,
    signal: controller.signal,
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('The request timed out. Please check the backend connection and try again.');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMessage =
      (typeof data === 'object' && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Authentication API endpoints
 */
export const authApi = {
  // POST /api/auth/register
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  // POST /api/auth/login
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // GET /api/auth/me
  getCurrentUser: () =>
    request('/auth/me', {
      method: 'GET',
    }),
};

/**
 * Jobs API endpoints (public)
 */
export const jobsApi = {
  // GET /api/jobs
  getPublishedJobs: () =>
    request('/jobs', {
      method: 'GET',
    }),

  // GET /api/jobs/{id}
  getPublishedJobById: (id) =>
    request(`/jobs/${id}`, {
      method: 'GET',
    }),
};

/**
 * Contact Query API endpoint
 */
export const contactApi = {
  // POST /api/contact
  submitQuery: (queryData) =>
    request('/contact', {
      method: 'POST',
      body: JSON.stringify(queryData),
    }),
};

/**
 * Job Applications API endpoints (authenticated applicant)
 */
export const applicationsApi = {
  // POST /api/jobs/{jobId}/apply
  apply: (jobId, applicationData) => {
    let body = applicationData;
    if (!(applicationData instanceof FormData)) {
      const formData = new FormData();
      Object.keys(applicationData).forEach((key) => {
        if (applicationData[key] !== null && applicationData[key] !== undefined) {
          formData.append(key, applicationData[key]);
        }
      });
      body = formData;
    }
    return request(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body,
    });
  },

  // GET /api/applications/my
  getMyApplications: () =>
    request('/applications/my', {
      method: 'GET',
    }),

  // GET /api/applications/my/{id}
  getMyApplicationById: (id) =>
    request(`/applications/my/${id}`, {
      method: 'GET',
    }),
};

/**
 * Admin Jobs API endpoints (ROLE_ADMIN)
 */
export const adminJobsApi = {
  // GET /api/admin/jobs
  getAllJobs: () =>
    request('/admin/jobs', {
      method: 'GET',
    }),

  // POST /api/admin/jobs
  createJob: (jobData) =>
    request('/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    }),

  // GET /api/admin/jobs/{id}
  getJobById: (id) =>
    request(`/admin/jobs/${id}`, {
      method: 'GET',
    }),

  // PUT /api/admin/jobs/{id}
  updateJob: (id, jobData) =>
    request(`/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    }),

  // PATCH /api/admin/jobs/{id}/status
  updateJobStatus: (id, status) =>
    request(`/admin/jobs/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // DELETE /api/admin/jobs/{id}
  deleteJob: (id) =>
    request(`/admin/jobs/${id}`, {
      method: 'DELETE',
    }),
};

/**
 * Admin Applications API endpoints (ROLE_ADMIN)
 */
export const adminApplicationsApi = {
  // GET /api/admin/applications
  getAllApplications: () =>
    request('/admin/applications', {
      method: 'GET',
    }),

  // GET /api/admin/applications/{id}
  getApplicationById: (id) =>
    request(`/admin/applications/${id}`, {
      method: 'GET',
    }),

  // PATCH /api/admin/applications/{id}/status
  updateApplicationStatus: (id, status) =>
    request(`/admin/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  // Authenticated resume stream download (using JWT)
  downloadResume: async (applicationId, applicantName) => {
    const token = getAuthToken();
    const url = `${API_BASE_URL.replace(/\/+$/, '')}/applications/${applicationId}/resume`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download resume (HTTP ${response.status})`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    const contentType = response.headers.get('content-type') || '';
    let ext = '.pdf';
    if (contentType.includes('word') || contentType.includes('document')) {
      ext = '.docx';
    }
    const safeName = (applicantName || `app_${applicationId}`).replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `resume_${safeName}${ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  },
};

/**
 * Admin Contact Queries API endpoints (ROLE_ADMIN)
 */
export const adminContactQueriesApi = {
  // GET /api/admin/contact-queries
  getAllQueries: () =>
    request('/admin/contact-queries', {
      method: 'GET',
    }),

  // GET /api/admin/contact-queries/{id}
  getQueryById: (id) =>
    request(`/admin/contact-queries/${id}`, {
      method: 'GET',
    }),

  // PATCH /api/admin/contact-queries/{id}/status
  updateQueryStatus: (id, status) =>
    request(`/admin/contact-queries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

/**
 * Admin Applicants API endpoints (ROLE_ADMIN)
 */
export const adminApplicantsApi = {
  // GET /api/admin/applicants (optional search query)
  getAllApplicants: (search) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return request(`/admin/applicants${query}`, {
      method: 'GET',
    });
  },

  // GET /api/admin/applicants/{id}
  getApplicantById: (id) =>
    request(`/admin/applicants/${id}`, {
      method: 'GET',
    }),

  // PATCH /api/admin/applicants/{id}/status
  updateApplicantStatus: (id, enabled) =>
    request(`/admin/applicants/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled }),
    }),
};

export default {
  auth: authApi,
  jobs: jobsApi,
  contact: contactApi,
  applications: applicationsApi,
  adminJobs: adminJobsApi,
  adminApplications: adminApplicationsApi,
  adminContactQueries: adminContactQueriesApi,
  adminApplicants: adminApplicantsApi,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
};
