# BSS Security Services Backend

## Docker build

Run these commands from the repository root:

```powershell
docker build -t bss-security-backend .\backend
```

The Dockerfile uses a multi-stage build:

1. Maven with Eclipse Temurin Java 26 compiles the Spring Boot application.
2. Eclipse Temurin Java 26 JRE runs the generated JAR.

No credentials or secrets are included in the image. The build context excludes `.env` files, uploads, logs, and build output.

## Run locally with Docker

Create a local environment file outside version control, for example `backend\.env.local`, with values for the required variables. Do not commit that file:

```text
DB_URL=jdbc:postgresql://host.docker.internal:5432/bss_db
DB_USERNAME=postgres
DB_PASSWORD=<local database password>
JWT_SECRET=<local JWT secret>
JWT_EXPIRATION=86400000
BSS_ADMIN_EMAIL=<local admin email>
BSS_ADMIN_PASSWORD=<local admin password>
```

Run the container:

```powershell
docker run --rm --name bss-security-backend `
  --env-file .\backend\.env.local `
  -e PORT=8080 `
  -p 8080:8080 `
  bss-security-backend
```

On Windows Docker Desktop, `host.docker.internal` lets the container reach PostgreSQL running on the host. If PostgreSQL runs elsewhere, set `DB_URL` to the appropriate reachable PostgreSQL JDBC URL.

The API is then available at:

```text
http://localhost:8080/api
```

For example, the public jobs endpoint can be checked with:

```powershell
Invoke-WebRequest http://localhost:8080/api/jobs
```

The container must be able to reach PostgreSQL before protected/authenticated operations can work. The application keeps the existing Spring Security, JWT, JPA, and API behavior.

## Runtime environment variables

The backend accepts the existing configuration names:

| Variable | Purpose |
| --- | --- |
| `DB_URL` | PostgreSQL JDBC URL |
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRATION` | JWT lifetime in milliseconds |
| `BSS_ADMIN_EMAIL` | Initial admin email used by the existing initializer |
| `BSS_ADMIN_PASSWORD` | Initial admin password used by the existing initializer |
| `PORT` | Render-provided HTTP port; defaults to `8080` locally |

The existing optional variables remain supported, including `BSS_ADMIN_NAME`, `BSS_ADMIN_PHONE`, and `CORS_ALLOWED_ORIGINS`. The admin initializer does not reset an existing user's password; it only creates the configured admin email when that email does not already exist.

## Render deployment

Create a Render Web Service connected to this repository with:

- **Root Directory:** `backend`
- **Runtime:** Docker
- **Dockerfile Path:** `Dockerfile`
- **Docker Build Context:** the `backend` directory

Set these Render environment variables:

```text
DB_URL=<Render PostgreSQL JDBC URL>
DB_USERNAME=<Render PostgreSQL username>
DB_PASSWORD=<Render PostgreSQL password>
JWT_SECRET=<strong generated secret>
JWT_EXPIRATION=86400000
BSS_ADMIN_EMAIL=<initial admin email>
BSS_ADMIN_PASSWORD=<initial admin password>
```

Render supplies `PORT` to the service. `server.port=${PORT:8080}` makes the application use it while retaining port `8080` for local development.

Do not put secrets in the Dockerfile, Git, or committed environment files. The Render PostgreSQL database is a separate service; PostgreSQL is not included in this image.

## Resume upload persistence

Resume files are currently stored on the local filesystem by `FileStorageService` under `uploads/resumes` by default. The service reads `app.upload.resume-dir`; the current `application.properties` contains `app.upload.dir`, so `UPLOAD_DIR` does not currently change that service's path without an application-code/configuration alignment change.

The `uploads/` directory is excluded from the image build context. Files written inside a running Render container are not durable across redeploys, restarts, or instance replacement unless persistent disk or external object storage is configured. Durable resume storage will need to be addressed separately before production use; this Dockerization does not redesign the upload implementation.
