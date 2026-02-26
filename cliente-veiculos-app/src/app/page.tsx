"use client";

import { useState } from "react";
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
import { CustomerList } from "@/components/Customer/CustomerList";
import { Cliente } from "@/types/customer";

const mockInitialData: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    telefone: "(22) 99999-9999",
    cpf: "123.456.789-00",
    placa: "ABC1D23",
  },
  {
    id: "2",
    nome: "Maria Souza",
    telefone: "(22) 88888-8888",
    cpf: "987.654.321-11",
    placa: "XYZ9A88",
  },
];

export default function Home() {
  const [customers, setCustomers] = useState<Cliente[]>(mockInitialData);

  function handleDelete(id: string) {
    setCustomers(customers.filter((c) => c.id !== id));
  }

  function handleEdit(customer: Cliente) {
    console.log("Editar:", customer);
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="500">
          Clientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          fullWidth={false}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Novo Cliente
        </Button>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
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

      <CustomerList
        customers={customers}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </Container>
  );
}
