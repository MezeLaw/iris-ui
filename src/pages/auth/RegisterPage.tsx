import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  Grid,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastname: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['admin', 'optometrista', 'recepcionista']),
  client_name: z.string().min(2, 'El nombre de la óptica es requerido'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser, isRegistering, registerError, isAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'admin',
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card elevation={8}>
          <CardContent sx={{ p: 4 }}>
            {/* Logo/Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <VisibilityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Registrarse en Iris
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Crea tu cuenta y comienza a gestionar tu óptica
              </Typography>
            </Box>

            {/* Error Alert */}
            {registerError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {(registerError as any)?.response?.data?.error || 'Error al registrarse'}
              </Alert>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isRegistering}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    {...register('lastname')}
                    error={!!errors.lastname}
                    helperText={errors.lastname?.message}
                    disabled={isRegistering}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={isRegistering}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={isRegistering}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre de la Óptica"
                    {...register('client_name')}
                    error={!!errors.client_name}
                    helperText={errors.client_name?.message}
                    disabled={isRegistering}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Rol"
                    defaultValue="admin"
                    {...register('role')}
                    error={!!errors.role}
                    helperText={errors.role?.message || 'Selecciona el rol del usuario'}
                    disabled={isRegistering}
                  >
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="optometrista">Optometrista</MenuItem>
                    <MenuItem value="recepcionista">Recepcionista</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isRegistering}
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {isRegistering ? <CircularProgress size={24} /> : 'Crear Cuenta'}
              </Button>
            </form>

            {/* Login Link */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Iniciar Sesión
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
