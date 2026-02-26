"use client";

import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function Header() {
  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <DirectionsCarIcon sx={{ display: "flex", mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: ".1rem" }}
          >
            SISTEMA DE PLACAS
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Controle de Clientes
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
