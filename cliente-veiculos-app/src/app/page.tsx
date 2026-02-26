import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="500">
          Clientes
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} size="large">
          Novo Cliente
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            fullWidth
            placeholder="Consultar pelo final da placa..."
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="outlined"
            size="large"
            sx={{ height: "56px", px: 4 }}
          >
            Filtrar
          </Button>
        </Box>
      </Paper>

      <Paper
        variant="outlined"
        sx={{ p: 4, textAlign: "center", color: "text.secondary" }}
      >
        A listagem de clientes será exibida aqui.
      </Paper>
    </Container>
  );
}
