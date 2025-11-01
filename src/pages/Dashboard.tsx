import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material';
import {
  People as PeopleIcon,
  CalendarMonth as CalendarIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';

export default function Dashboard() {
  // TODO: Fetch real data from API
  const stats = [
    { label: 'Total Pacientes', value: '0', icon: <PeopleIcon fontSize="large" />, color: '#1976d2' },
    { label: 'Turnos Hoy', value: '0', icon: <CalendarIcon fontSize="large" />, color: '#00897b' },
    { label: 'Turnos Pendientes', value: '0', icon: <CheckIcon fontSize="large" />, color: '#f57c00' },
    { label: 'Pacientes Activos', value: '0', icon: <TrendingIcon fontSize="large" />, color: '#388e3c' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Bienvenido al sistema de gestión Iris
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.label}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Today's Appointments */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Turnos de Hoy
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No hay turnos programados para hoy
        </Typography>
      </Paper>
    </Box>
  );
}
