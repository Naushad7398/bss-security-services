/**
 * Centralized API client for BSS Security Services.
 * Communicates with the Spring Boot backend REST endpoints.
 */

// Base URL configurable via Vite environment variables with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Local storage key for JWT authentication token
const TOKEN_KEY = 'bss_auth_token';

/**
 * Retrieve current JWT token from storage (if any).
 */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Persist or clear JWT token in storage.
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Remove JWT token from storage.
 */
export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
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
  }

  // Allow browser to manage multipart boundary when sending FormData
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);

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

export default {
  auth: authApi,
  jobs: jobsApi,
  contact: contactApi,
  applications: applicationsApi,
  adminJobs: adminJobsApi,
  adminApplications: adminApplicationsApi,
  adminContactQueries: adminContactQueriesApi,
  getAuthToken,
  setAuthToken,
  clearAuthToken,
};
