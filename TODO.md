# TODO - Iris Frontend Implementation

Este documento lista todas las tareas pendientes para completar el MVP del sistema Iris.

---

## 🚧 Módulos Pendientes

### 1. Pacientes Module (PRIORIDAD ALTA)

#### 1.1 Patient List Page
- [ ] Crear componente `PatientsListTable` con MUI DataGrid
  - [ ] Implementar columnas: Nombre, Apellido, DNI, Email, Teléfono, Edad, Última visita
  - [ ] Agregar acciones: Ver, Editar, Eliminar
  - [ ] Implementar paginación server-side
- [ ] Crear barra de búsqueda con debounce
  - [ ] Búsqueda por nombre, DNI, email, teléfono
  - [ ] Integrar con endpoint `/pacientes/search?q={query}`
- [ ] Botón "Nuevo Paciente" que abra modal/página de creación
- [ ] Implementar soft delete con confirmación
- [ ] Estados de loading y empty state

#### 1.2 Create/Edit Patient Form
- [ ] Crear componente `PatientForm` con React Hook Form
- [ ] Definir schema Zod para validación de paciente
- [ ] Implementar formulario con secciones:
  - [ ] Datos Personales (nombre, apellido, DNI, email, teléfono, fecha nacimiento)
  - [ ] Dirección (dirección, ciudad, provincia, código postal)
  - [ ] Obra Social (obra social, número afiliado)
  - [ ] Observaciones
- [ ] Opción de agregar antecedentes médicos al crear paciente
- [ ] Integrar con API endpoints:
  - [ ] `POST /pacientes` (crear)
  - [ ] `PUT /pacientes/:id` (actualizar)
- [ ] Manejo de errores y validación
- [ ] Success feedback (toast/snackbar)

#### 1.3 Patient Detail Page
- [ ] Crear layout con tabs (Material-UI Tabs)
- [ ] **Tab 1: Información Personal**
  - [ ] Mostrar todos los datos del paciente
  - [ ] Botón "Editar" que abra el formulario
  - [ ] Cálculo automático de edad desde fecha_nacimiento
- [ ] **Tab 2: Antecedentes Médicos**
  - [ ] Formulario editable con campos: diabetes, hipertensión, alergias, cirugías previas, medicación actual, otras condiciones
  - [ ] Integrar con `PUT /pacientes/:id/antecedentes-medicos`
  - [ ] Mostrar estado vacío si no hay datos
- [ ] **Tab 3: Antecedentes Visuales**
  - [ ] Formulario editable: usa lentes de contacto, marca, complicaciones previas, observaciones
  - [ ] Integrar con `PUT /pacientes/:id/antecedentes-visuales`
- [ ] **Tab 4: Exámenes Visuales**
  - [ ] Lista de exámenes ordenados por fecha (más reciente primero)
  - [ ] Botón "Nuevo Examen"
  - [ ] Botón "Comparar" (seleccionar 2 exámenes)
  - [ ] Gráfico de evolución (si hay múltiples exámenes)
- [ ] **Tab 5: Historial de Turnos**
  - [ ] Tabla con turnos del paciente
  - [ ] Filtros por estado
  - [ ] Botón "Agendar Nuevo Turno"

#### 1.4 API Hooks (React Query)
- [ ] Crear `src/hooks/queries/usePacientes.ts` con:
  - [ ] `usePacientes(page, pageSize)` - Lista paginada
  - [ ] `usePaciente(id, complete)` - Detalle de paciente
  - [ ] `useSearchPacientes(query)` - Búsqueda
  - [ ] `useCreatePaciente()` - Mutation para crear
  - [ ] `useUpdatePaciente()` - Mutation para actualizar
  - [ ] `useDeletePaciente()` - Mutation para eliminar
  - [ ] `useUpdateAntecedentesMedicos()` - Mutation para antecedentes médicos
  - [ ] `useUpdateAntecedentesVisuales()` - Mutation para antecedentes visuales

---

### 2. Exámenes Visuales Module (PRIORIDAD ALTA)

#### 2.1 Visual Exam Form
- [ ] Crear componente `VisualExamForm`
- [ ] Schema Zod para validación de examen
- [ ] Layout en dos columnas: OD (Ojo Derecho) | OI (Ojo Izquierdo)
- [ ] Campos por ojo:
  - [ ] Esfera (number input con step 0.25)
  - [ ] Cilindro (number input con step 0.25)
  - [ ] Eje (0-180 grados)
  - [ ] ADD (adición para presbicia)
  - [ ] Agudeza Visual (text input, ej: "20/20")
- [ ] Campo fecha de examen (date picker)
- [ ] Campo observaciones (textarea)
- [ ] Integrar con `POST /examenes-visuales`
- [ ] Validaciones personalizadas (rangos de valores)

#### 2.2 Exam List & History
- [ ] Crear componente `ExamHistoryList`
- [ ] Mostrar exámenes en cards o tabla
- [ ] Cada examen muestra: fecha, valores OD/OI, botones editar/eliminar
- [ ] Integrar con `GET /pacientes/:id/examenes`
- [ ] Botón para crear nuevo examen

#### 2.3 Exam Comparison Feature
- [ ] Crear componente `ExamComparison`
- [ ] UI para seleccionar 2 exámenes (dropdowns o checkboxes)
- [ ] Vista lado a lado mostrando:
  - [ ] Valores anteriores vs actuales
  - [ ] Diferencias calculadas
  - [ ] Alerta visual si cambio > 0.25D (badge o color)
- [ ] Integrar con `GET /examenes-visuales/comparar?anterior={id}&actual={id}`
- [ ] Mostrar mensaje de alerta del backend si hay cambios significativos

#### 2.4 Visual Evolution Chart
- [ ] Crear componente `VisualEvolutionChart` con Recharts
- [ ] Gráfico de líneas mostrando evolución de:
  - [ ] Esfera OD/OI a lo largo del tiempo
  - [ ] Cilindro OD/OI a lo largo del tiempo
- [ ] Eje X: fechas de exámenes
- [ ] Eje Y: valores dióptricos
- [ ] Leyenda y tooltips
- [ ] Responsive design

#### 2.5 API Hooks
- [ ] Crear `src/hooks/queries/useExamenes.ts` con:
  - [ ] `useExamenesPaciente(pacienteId)` - Lista de exámenes
  - [ ] `useExamen(id)` - Detalle de examen
  - [ ] `useCreateExamen()` - Mutation para crear
  - [ ] `useUpdateExamen()` - Mutation para actualizar
  - [ ] `useDeleteExamen()` - Mutation para eliminar
  - [ ] `useCompararExamenes(anteriorId, actualId)` - Comparación

---

### 3. Turnos/Agenda Module (PRIORIDAD MEDIA)

#### 3.1 Calendar View
- [ ] Decidir librería de calendario:
  - [ ] Opción 1: FullCalendar (más completa)
  - [ ] Opción 2: MUI X Date components (más integrado)
  - [ ] Opción 3: Custom implementation con MUI
- [ ] Implementar vistas: Día, Semana, Mes
- [ ] Color-coding por estado:
  - [ ] Pendiente: Amarillo/Naranja
  - [ ] Confirmado: Azul
  - [ ] Completado: Verde
  - [ ] Cancelado: Rojo
  - [ ] No asistió: Gris
- [ ] Click en evento abre modal de detalles
- [ ] Filtro por profesional (dropdown)
- [ ] Navegación entre fechas

#### 3.2 Create Appointment Form
- [ ] Crear componente `AppointmentForm`
- [ ] Schema Zod para validación
- [ ] Campos:
  - [ ] Paciente (autocomplete searchable con API search)
  - [ ] Profesional (dropdown de usuarios tipo admin/optometrista)
  - [ ] Fecha y Hora (date-time picker)
  - [ ] Duración (default 30 min, opciones 15/30/45/60)
  - [ ] Tipo de servicio (dropdown: consulta, control, entrega lentes, etc.)
  - [ ] Observaciones (textarea)
- [ ] Validación de disponibilidad antes de crear
  - [ ] Integrar con `POST /turnos/disponibilidad`
  - [ ] Mostrar mensaje si hay conflicto
- [ ] Integrar con `POST /turnos`

#### 3.3 Appointment Details Modal
- [ ] Crear componente `AppointmentDetailsModal`
- [ ] Mostrar información completa del turno
- [ ] Datos del paciente y profesional
- [ ] Botones de acción:
  - [ ] Editar
  - [ ] Cambiar estado (dropdown con estados)
  - [ ] Cancelar/Eliminar
- [ ] Integrar con:
  - [ ] `GET /turnos/:id`
  - [ ] `PUT /turnos/:id`
  - [ ] `PATCH /turnos/:id/estado`
  - [ ] `DELETE /turnos/:id`

#### 3.4 Appointment List View (alternativa al calendario)
- [ ] Tabla con filtros
- [ ] Columnas: Fecha/Hora, Paciente, Profesional, Tipo servicio, Estado, Acciones
- [ ] Filtros:
  - [ ] Rango de fechas
  - [ ] Estado
  - [ ] Profesional
  - [ ] Paciente
- [ ] Paginación
- [ ] Sort por columna

#### 3.5 API Hooks
- [ ] Crear `src/hooks/queries/useTurnos.ts` con:
  - [ ] `useTurnos(filters)` - Lista con filtros
  - [ ] `useTurno(id)` - Detalle
  - [ ] `useTurnosPorDia(fecha, profesionalId)` - Vista día
  - [ ] `useTurnosPorSemana(fecha, profesionalId)` - Vista semana
  - [ ] `useCreateTurno()` - Mutation crear
  - [ ] `useUpdateTurno()` - Mutation actualizar
  - [ ] `useUpdateEstadoTurno()` - Mutation cambiar estado
  - [ ] `useDeleteTurno()` - Mutation eliminar
  - [ ] `useCheckDisponibilidad()` - Query disponibilidad

---

### 4. Reportes Module (PRIORIDAD BAJA)

#### 4.1 Active Patients Report
- [ ] Crear componente `ActivePatientsReport`
- [ ] Tabla con columnas: Nombre, Apellido, Último turno, Cantidad de turnos
- [ ] Integrar con `GET /reportes/pacientes-activos`
- [ ] Botón de exportación (PDF/Excel - opcional)
- [ ] Filtros por rango de fechas (opcional)

#### 4.2 Inactive Patients Report
- [ ] Crear componente `InactivePatientsReport`
- [ ] Tabla con pacientes sin turnos en 60+ días
- [ ] Acción: "Agendar seguimiento" (redirige a crear turno)
- [ ] Integrar con `GET /reportes/pacientes-inactivos`

#### 4.3 API Hooks
- [ ] Crear `src/hooks/queries/useReportes.ts` con:
  - [ ] `usePacientesActivos()` - Query pacientes activos
  - [ ] `usePacientesInactivos()` - Query pacientes inactivos

---

### 5. Usuarios Module (PRIORIDAD BAJA - Admin Only)

#### 5.1 Users List
- [ ] Crear componente `UsersListTable`
- [ ] Columnas: Nombre, Apellido, Email, Rol, Fecha creación, Acciones
- [ ] Botón "Nuevo Usuario"
- [ ] Integrar con `GET /users?page=1&page_size=10`
- [ ] Solo accesible por admin

#### 5.2 Create/Edit User Form
- [ ] Crear componente `UserForm`
- [ ] Schema Zod para validación
- [ ] Campos:
  - [ ] Nombre
  - [ ] Apellido
  - [ ] Email
  - [ ] Contraseña (solo al crear)
  - [ ] Rol (dropdown: admin, optometrista, recepcionista)
- [ ] Integrar con:
  - [ ] `POST /users`
  - [ ] `PUT /users/:id`

#### 5.3 API Hooks
- [ ] Crear `src/hooks/queries/useUsers.ts` con:
  - [ ] `useUsers(page, pageSize)` - Lista paginada
  - [ ] `useUser(id)` - Detalle
  - [ ] `useCreateUser()` - Mutation crear
  - [ ] `useUpdateUser()` - Mutation actualizar
  - [ ] `useDeleteUser()` - Mutation eliminar (deactivate)

---

### 6. Dashboard - Datos Reales (PRIORIDAD MEDIA)

- [ ] Integrar estadísticas reales en las cards
  - [ ] Total pacientes (count de pacientes)
  - [ ] Turnos hoy (filtrar turnos por fecha actual)
  - [ ] Turnos pendientes (count por estado)
  - [ ] Pacientes activos (de reporte)
- [ ] Sección "Turnos de Hoy"
  - [ ] Listar turnos del día actual
  - [ ] Mostrar paciente, hora, profesional, estado
  - [ ] Click en turno abre detalles
- [ ] Agregar gráficos/estadísticas adicionales (opcional):
  - [ ] Gráfico de turnos por mes
  - [ ] Gráfico de pacientes nuevos

---

### 7. UI/UX Polish & Responsive (PRIORIDAD MEDIA)

#### 7.1 Loading States
- [ ] Skeletons para tablas mientras cargan
- [ ] Loaders para formularios
- [ ] Progress bars para operaciones largas

#### 7.2 Error Handling
- [ ] Error boundaries para capturar errores de React
- [ ] Mensajes de error user-friendly
- [ ] Retry buttons en caso de error de red
- [ ] Fallback UI para errores

#### 7.3 Success Feedback
- [ ] Toasts/Snackbars para operaciones exitosas
  - [ ] "Paciente creado exitosamente"
  - [ ] "Turno actualizado"
  - [ ] etc.
- [ ] Confirmaciones para acciones destructivas
  - [ ] "¿Está seguro de eliminar este paciente?"

#### 7.4 Accessibility (WCAG 2.1 AA)
- [ ] Revisar contraste de colores
- [ ] Labels en todos los inputs
- [ ] ARIA attributes donde sea necesario
- [ ] Navegación por teclado
- [ ] Focus management en modales

#### 7.5 Responsive Testing
- [ ] Probar en mobile (320px - 767px)
- [ ] Probar en tablet (768px - 1023px)
- [ ] Probar en desktop (1024px+)
- [ ] Ajustar tablas para mobile (scroll horizontal o cards)
- [ ] Menú mobile friendly

---

### 8. Features Nice-to-Have (Post-MVP)

#### 8.1 Advanced Features
- [ ] Drag-and-drop para reprogramar turnos en calendario
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Exportar reportes a PDF/Excel
- [ ] Dark mode toggle
- [ ] Multi-idioma (ES/EN)
- [ ] Recordatorios de turnos vía email/SMS
- [ ] Filtros avanzados y búsqueda global
- [ ] Historial de cambios (audit log)

#### 8.2 Performance Optimizations
- [ ] Code splitting por ruta (React.lazy)
- [ ] Virtualización para listas largas
- [ ] Optimistic updates en mutations
- [ ] Service Worker para offline support
- [ ] Image optimization

#### 8.3 Testing
- [ ] Unit tests para utilities y hooks
- [ ] Integration tests para flujos críticos
- [ ] E2E tests con Playwright (opcional)
- [ ] Coverage mínimo 70%

---

## 📊 Progreso Estimado

| Módulo | Prioridad | Complejidad | Estado | Progreso |
|--------|-----------|-------------|--------|----------|
| **Infraestructura Base** | ✅ | Alta | Completado | 100% |
| **Autenticación** | ✅ | Media | Completado | 100% |
| **Routing & Layout** | ✅ | Media | Completado | 100% |
| **Pacientes CRUD** | 🔴 Alta | Alta | Pendiente | 0% |
| **Exámenes Visuales** | 🔴 Alta | Alta | Pendiente | 0% |
| **Turnos/Agenda** | 🟡 Media | Alta | Pendiente | 0% |
| **Reportes** | 🟢 Baja | Baja | Pendiente | 0% |
| **Usuarios** | 🟢 Baja | Media | Pendiente | 0% |
| **Dashboard Datos** | 🟡 Media | Baja | Pendiente | 0% |
| **UI/UX Polish** | 🟡 Media | Media | Pendiente | 0% |

**Leyenda:**
- 🔴 Prioridad Alta
- 🟡 Prioridad Media
- 🟢 Prioridad Baja

---

## 🎯 Orden Sugerido de Implementación

### Sprint 1: Pacientes (Crítico)
1. API hooks de pacientes
2. Lista de pacientes con búsqueda
3. Formulario crear/editar paciente
4. Página de detalle con tabs
5. Antecedentes médicos y visuales

### Sprint 2: Exámenes Visuales (Crítico)
1. API hooks de exámenes
2. Formulario de examen visual
3. Lista de exámenes en detalle de paciente
4. Comparación de exámenes
5. Gráfico de evolución

### Sprint 3: Turnos (Importante)
1. API hooks de turnos
2. Vista de calendario básica
3. Formulario crear turno
4. Modal de detalles
5. Cambio de estados

### Sprint 4: Polish & Extras
1. Dashboard con datos reales
2. Reportes básicos
3. Gestión de usuarios (admin)
4. Loading states y error handling
5. Responsive testing

---

## 📝 Notas de Implementación

### Componentes Reutilizables a Crear
- [ ] `ConfirmDialog` - Para confirmaciones de eliminación
- [ ] `LoadingButton` - Botón con estado de loading
- [ ] `SearchBar` - Barra de búsqueda con debounce
- [ ] `DataTable` - Wrapper de MUI DataGrid con configuración común
- [ ] `DateRangePicker` - Selector de rango de fechas
- [ ] `StatusChip` - Chip con color por estado
- [ ] `EmptyState` - Placeholder para listas vacías

### Utilities a Crear
- [ ] `formatDate(date, format)` - Formateo de fechas con date-fns
- [ ] `calculateAge(birthDate)` - Calcular edad desde fecha nacimiento
- [ ] `validateDNI(dni)` - Validación de DNI argentino
- [ ] `debounce(fn, delay)` - Función debounce para búsquedas
- [ ] `formatPhoneNumber(phone)` - Formateo de teléfono

### Consideraciones de Backend
- Verificar que el backend esté corriendo en `http://localhost:8080`
- Comprobar health check: `curl http://localhost:8080/health`
- Validar estructura de respuestas de la API
- Confirmar paginación (page starts at 1, not 0)
- Verificar multi-tenancy (client_id automático vía JWT)

---

## ✅ Criterios de Aceptación MVP

El MVP se considera completo cuando:

- [x] Usuario puede registrarse y login
- [x] Sistema de autenticación funciona correctamente
- [x] Rutas protegidas y RBAC funcionan
- [ ] CRUD completo de pacientes funciona
- [ ] Antecedentes médicos y visuales se pueden editar
- [ ] Exámenes visuales se pueden crear y listar
- [ ] Comparación de exámenes funciona
- [ ] Turnos se pueden crear, editar y visualizar
- [ ] Calendario muestra turnos correctamente
- [ ] Estados de turnos se pueden cambiar
- [ ] Dashboard muestra estadísticas reales
- [ ] Reportes básicos funcionan
- [ ] Admin puede gestionar usuarios
- [ ] UI es responsive en mobile/tablet/desktop
- [ ] Manejo de errores es user-friendly
- [ ] App builds sin errores
- [ ] Documentación está actualizada

---

**Última actualización:** 2025-11-01
**Progreso general del MVP:** ~40% completado
