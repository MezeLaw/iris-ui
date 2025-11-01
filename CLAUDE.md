# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Iris** is a multi-tenant SaaS application for optical clinics (ópticas) that manages:
- Patients with complete medical and visual history
- Appointments scheduling (turnos/agenda)
- Visual exams and refraction tracking
- Reports on patient activity
- Multi-user management with role-based access control

This is a modern React application built with **Vite + TypeScript + Material-UI**.

## Technical Stack

- **Framework**: React 19.1.1 with TypeScript 5.9.3
- **Build Tool**: Vite 7.1.7
- **UI Framework**: Material-UI (MUI) v6.3.1
- **Routing**: React Router v7.3.0
- **State Management**:
  - TanStack Query (React Query) v5 - Server state
  - Zustand v5 - Client state (auth)
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Date Handling**: date-fns v4
- **Charts**: Recharts v2 (for visual evolution graphs)
- **Testing**: Vitest + React Testing Library

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts Vite dev server on http://localhost:3000 with hot module replacement.

### Build for Production
```bash
npm run build
```
TypeScript compilation + Vite production build to `dist/` folder.

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally.

### Linting
```bash
npm run lint
```
Runs ESLint on the codebase.

### Testing
```bash
npm test
```
Runs Vitest test suite.

## Project Structure

```
iris-ui/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── api/                    # API layer
│   │   ├── axios-client.ts     # Axios instance with interceptors
│   │   └── endpoints/          # API endpoint functions
│   │       ├── auth.ts
│   │       ├── patients.ts
│   │       ├── appointments.ts
│   │       └── reports.ts
│   ├── components/             # React components
│   │   ├── common/             # Shared components
│   │   ├── layout/             # Layout components
│   │   │   └── DashboardLayout.tsx
│   │   ├── patients/           # Patient-specific components
│   │   ├── appointments/       # Appointment components
│   │   ├── reports/            # Report components
│   │   └── users/              # User management components
│   ├── pages/                  # Page components
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── patients/
│   │   │   ├── PatientsPage.tsx
│   │   │   └── PatientDetailPage.tsx
│   │   ├── appointments/
│   │   │   └── AppointmentsPage.tsx
│   │   ├── reports/
│   │   │   └── ReportsPage.tsx
│   │   ├── users/
│   │   │   └── UsersPage.tsx
│   │   └── Dashboard.tsx
│   ├── hooks/                  # Custom hooks
│   │   ├── useAuth.ts          # Authentication hook
│   │   └── queries/            # React Query hooks
│   ├── store/                  # Zustand stores
│   │   └── authStore.ts        # Auth state management
│   ├── types/                  # TypeScript types
│   │   └── api.ts              # API type definitions
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # App entry point
│   ├── theme.ts                # MUI theme configuration
│   └── index.css               # Global styles
├── .env                        # Environment variables (gitignored)
├── .env.example                # Example environment variables
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
├── tsconfig.app.json           # App-specific TS config
└── package.json
```

## Architecture & Key Patterns

### API Integration

The backend API is at `http://localhost:8080/api/v1`. All API calls use Axios with:
- JWT token authentication (Bearer token)
- Automatic token injection via request interceptor
- 401 redirect to login on unauthorized requests
- Consistent error handling via response interceptor

**Example API call:**
```typescript
import apiClient from '@/api/axios-client';

const response = await apiClient.get('/pacientes?page=1&page_size=10');
```

### Authentication Flow

1. **Login/Register**: User credentials sent to `/auth/login` or `/auth/register`
2. **Token Storage**: JWT token stored in localStorage and Zustand store
3. **Protected Routes**: `ProtectedRoute` wrapper checks auth state
4. **Token Validation**: On app mount, token validated via `/auth/validate`
5. **Auto-logout**: 401 responses clear auth and redirect to login

### State Management

- **Server State**: TanStack Query for all API data (caching, refetching, mutations)
- **Client State**: Zustand for auth state (user, client, token, isAuthenticated)
- **Form State**: React Hook Form with Zod schema validation

### Routing Structure

- `/login` - Public login page
- `/register` - Public registration page
- `/` - Protected dashboard (requires auth)
- `/patients` - Patient list
- `/patients/:id` - Patient detail
- `/appointments` - Appointments calendar
- `/reports` - Reports page
- `/users` - User management (admin only)

### Role-Based Access Control

- **admin**: Full access to all features
- **optometrista**: Can manage patients, exams, appointments, view reports
- **recepcionista**: Can manage appointments, view patient info (read-only medical data)

Admin-only routes wrapped in `AdminRoute` component (checks user.role === 'admin').

### Material-UI Theme

Custom theme in `src/theme.ts` with:
- Professional medical color scheme (blues, teals)
- Consistent spacing and typography
- Custom component overrides (buttons, cards)
- Responsive breakpoints

### Environment Variables

Required variables in `.env`:
```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_APP_NAME=Iris
VITE_APP_DESCRIPTION=Sistema de Gestión para Ópticas
```

## API Endpoints Reference

### Auth
- `POST /auth/login` - Login
- `POST /auth/register` - Register (first user creates client)
- `POST /auth/validate` - Validate token

### Patients
- `GET /pacientes?page=1&page_size=10` - List patients (paginated)
- `GET /pacientes/search?q={query}` - Search patients
- `GET /pacientes/:id?complete=true` - Get patient with full history
- `POST /pacientes` - Create patient
- `PUT /pacientes/:id` - Update patient
- `DELETE /pacientes/:id` - Soft delete patient
- `PUT /pacientes/:id/antecedentes-medicos` - Update medical history
- `PUT /pacientes/:id/antecedentes-visuales` - Update visual history

### Visual Exams
- `GET /pacientes/:id/examenes` - Get patient exams
- `POST /examenes-visuales` - Create exam
- `PUT /examenes-visuales/:id` - Update exam
- `DELETE /examenes-visuales/:id` - Delete exam
- `GET /examenes-visuales/comparar?anterior={id}&actual={id}` - Compare two exams

### Appointments
- `GET /turnos?page=1&fecha_desde={date}&fecha_hasta={date}&estado={status}` - List appointments
- `GET /turnos/:id` - Get appointment details
- `POST /turnos` - Create appointment
- `PUT /turnos/:id` - Update appointment
- `PATCH /turnos/:id/estado` - Change appointment status
- `DELETE /turnos/:id` - Delete appointment
- `POST /turnos/disponibilidad` - Check availability
- `GET /turnos/por-dia/{date}` - Day view
- `GET /turnos/por-semana/{date}` - Week view

### Reports
- `GET /reportes/pacientes-activos` - Active patients report
- `GET /reportes/pacientes-inactivos` - Inactive patients report

### Users
- `GET /users?page=1&page_size=10` - List users
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Development Status

**Completed:**
- ✅ Vite + TypeScript migration
- ✅ MUI theme and layout
- ✅ Authentication system (login, register, protected routes)
- ✅ Routing infrastructure
- ✅ API client with interceptors
- ✅ Basic dashboard skeleton

**In Progress:**
- 🚧 Patient CRUD operations
- 🚧 Medical & Visual History forms
- 🚧 Visual Exams module with comparison
- 🚧 Appointments calendar
- 🚧 Reports module
- 🚧 User management

## Multi-Tenancy

All API calls are automatically filtered by `client_id` (handled by backend via JWT token). Each clinic sees only their own data. No need to manually pass `client_id` in requests.

## Code Style & Conventions

- Use functional components with hooks
- Use TypeScript strict mode
- Import paths use `@/` alias (configured in vite.config.ts)
- API types defined in `src/types/api.ts`
- React Query hooks in `src/hooks/queries/`
- Form validation with Zod schemas
- MUI components over custom CSS when possible
- Responsive design using MUI breakpoints

## Common Tasks

### Adding a New Page
1. Create page component in `src/pages/{module}/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/layout/DashboardLayout.tsx`

### Adding a New API Endpoint
1. Add function to `src/api/endpoints/{module}.ts`
2. Create React Query hook in `src/hooks/queries/use{Module}.ts`
3. Use hook in component

### Adding a New Form
1. Define Zod schema
2. Use `useForm` with `zodResolver`
3. Integrate with React Query mutation for submission

## Testing Backend Connection

Backend must be running on `http://localhost:8080`. Check health:
```bash
curl http://localhost:8080/health
```

## Deployment

Build for production:
```bash
npm run build
```

Output in `dist/` folder can be served by any static hosting (Vercel, Netlify, etc.).
