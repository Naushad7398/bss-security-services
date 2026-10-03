# BSS Suraksha Services Pvt. Ltd. - Website & Portal

A full-stack enterprise web portal for BSS Suraksha Services Pvt. Ltd. featuring a professional public website, careers portal, applicant submission workflow, and admin management dashboard.

---

## Project Structure

```
BSS website/
├── frontend/
│   ├── public/             # Static public assets (favicons, icons, logo)
│   ├── src/                # React components, pages, routes, data, styles
│   ├── index.html          # HTML entry point
│   ├── package.json        # Frontend scripts and npm dependencies
│   ├── package-lock.json   # Deterministic npm dependency lock
│   └── vite.config.js      # Vite build and Tailwind CSS configuration
│
├── backend/
│   ├── src/                # Spring Boot Java 26 application source & resources
│   ├── pom.xml             # Maven configuration and dependencies
│   ├── .gitignore          # Backend-specific ignore rules
│   └── .env.example        # Environment variable template
│
├── .gitignore              # Repository root Git ignore rules
└── README.md               # Project documentation and architecture guide
```

---

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Icons & Animations**: Lucide React, Framer Motion

### Backend
- **Language**: Java 26
- **Framework**: Spring Boot 3.4.3
- **Security**: Spring Security 6 with BCrypt & JWT (JJWT 0.12.6)
- **Data & ORM**: Spring Data JPA / Hibernate
- **Database**: PostgreSQL
- **Build Tool**: Apache Maven

---

## Getting Started

### 1. Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

### 2. Backend Development

Ensure Java 26 and PostgreSQL are installed and configured.

```bash
cd backend
mvn clean compile
mvn spring-boot:run
```
