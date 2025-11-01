// ==================== Auth Types ====================
export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: UserRole;
  client_id: number;
  created_at: string;
}

export type UserRole = 'admin' | 'optometrista' | 'recepcionista';

export interface Client {
  id: number;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: UserRole;
  client_name?: string; // Required for first user
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
    client: Client;
  };
}

export interface ValidateTokenResponse {
  message: string;
  data: {
    user_id: number;
    client_id: number;
    role: UserRole;
    email: string;
  };
}

// ==================== Patient Types ====================
export interface Paciente {
  id: number;
  client_id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string; // ISO date
  edad: number; // Auto-calculated
  direccion: string;
  ciudad: string;
  provincia: string;
  codigo_postal: string;
  obra_social: string;
  numero_afiliado: string;
  observaciones: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface AntecedentesMedicos {
  id: number;
  paciente_id: number;
  diabetes: boolean;
  hipertension: boolean;
  alergias: string;
  cirugias_previas: string;
  medicacion_actual: string;
  otras_condiciones: string;
  created_at: string;
  updated_at: string;
}

export interface AntecedentesVisuales {
  id: number;
  paciente_id: number;
  usa_lentes_contacto: boolean;
  marca_lentes_contacto: string;
  complicaciones_previas: string;
  observaciones: string;
  created_at: string;
  updated_at: string;
}

export interface ExamenVisual {
  id: number;
  paciente_id: number;
  fecha_examen: string; // ISO date

  // Ojo derecho (OD)
  od_esfera: number;
  od_cilindro: number;
  od_eje: number;
  od_add: number;
  od_agudeza_visual: string;

  // Ojo izquierdo (OI)
  oi_esfera: number;
  oi_cilindro: number;
  oi_eje: number;
  oi_add: number;
  oi_agudeza_visual: string;

  observaciones: string;
  created_at: string;
  updated_at: string;
}

export interface ComparacionExamenes {
  cambios_significativos: boolean;
  cambios: {
    od_esfera_diff: number;
    od_cilindro_diff: number;
    oi_esfera_diff: number;
    oi_cilindro_diff: number;
  };
  alerta: string; // Mensaje si cambio > 0.25D
}

export interface PacienteCompleto {
  paciente: Paciente;
  antecedentes_medicos?: AntecedentesMedicos;
  antecedentes_visuales?: AntecedentesVisuales;
  examenes_visuales?: ExamenVisual[];
}

export interface CreatePacienteRequest {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigo_postal: string;
  obra_social: string;
  numero_afiliado: string;
  observaciones?: string;
  antecedentes_medicos?: Partial<Omit<AntecedentesMedicos, 'id' | 'paciente_id' | 'created_at' | 'updated_at'>>;
}

export interface UpdatePacienteRequest extends Partial<CreatePacienteRequest> {}

// ==================== Appointment Types ====================
export type EstadoTurno =
  | 'pendiente'
  | 'confirmado'
  | 'cancelado'
  | 'completado'
  | 'no_asistio';

export interface Turno {
  id: number;
  client_id: number;
  paciente_id: number;
  profesional_user_id: number;
  tipo_servicio: string; // "consulta", "control", "entrega_lentes", etc.
  fecha_hora: string; // ISO datetime
  duracion_minutos: number;
  hora_fin: string; // Auto-calculated
  estado: EstadoTurno;
  observaciones: string;
  created_at: string;
  updated_at: string;
}

export interface TurnoConDetalles extends Turno {
  paciente_nombre: string;
  paciente_apellido: string;
  paciente_email: string;
  profesional_nombre: string;
  profesional_apellido: string;
  profesional_email: string;
}

export interface CreateTurnoRequest {
  paciente_id: number;
  profesional_user_id: number;
  tipo_servicio: string;
  fecha_hora: string;
  duracion_minutos: number;
  observaciones?: string;
}

export interface UpdateTurnoRequest extends Partial<CreateTurnoRequest> {}

export interface DisponibilidadRequest {
  profesional_user_id: number;
  fecha_hora: string;
  duracion_minutos: number;
  turno_id?: number | null; // Optional: exclude when editing
}

export interface DisponibilidadResponse {
  disponible: boolean;
  mensaje: string;
  turnos_conflicto?: Turno[];
}

// ==================== Report Types ====================
export interface PacienteActivoReport {
  paciente_id: number;
  nombre: string;
  apellido: string;
  ultimo_turno: string;
  cantidad_turnos: number;
}

export interface PacienteInactivoReport {
  paciente_id: number;
  nombre: string;
  apellido: string;
  ultimo_turno: string | null;
  dias_sin_turno: number;
}

// ==================== Generic API Response Types ====================
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PaginatedData<T = any> {
  total: number;
  page: number;
  page_size: number;
  [key: string]: T[] | number;
}

export interface PaginatedResponse<T> {
  message: string;
  data: PaginatedData<T>;
}

export interface ApiError {
  error: string;
  details?: string;
}
