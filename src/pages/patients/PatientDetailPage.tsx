import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function PatientDetailPage() {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Detalle del Paciente #{id}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Detalles del paciente - En desarrollo
      </Typography>
    </Box>
  );
}
