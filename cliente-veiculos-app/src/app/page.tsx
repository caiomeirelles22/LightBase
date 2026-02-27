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
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { CustomerList } from "@/components/Customer/CustomerList";
import { CustomerModal } from "@/components/Customer/CustomerModal";
import { useCustomers } from "@/context/CustomerContext";
import { Customer } from "@/types/customer";
import { CustomerFormData } from "@/utils/customerSchema";

export default function Home() {
  const {
    customers,
    loading,
    loadCustomers,
    removeCustomer,
    addCustomer,
    updateCustomer,
  } = useCustomers();

  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  function handleFilter() {
    loadCustomers(filter);
  }

  function handleOpenCreateModal() {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  }

  function handleOpenEditModal(customer: Customer) {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  }

  async function handleSaveCustomer(data: CustomerFormData) {
    if (selectedCustomer) {
      await updateCustomer(selectedCustomer.id, data);
    } else {
      await addCustomer(data);
    }
    handleCloseModal();
  }

  function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja remover este cliente?")) {
      removeCustomer(id);
    }
  }

  function handleEdit(customer: Customer) {
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
          Customers
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={handleOpenCreateModal}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Novo Customer
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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
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
            onClick={handleFilter}
            sx={{ height: "56px", px: 4 }}
          >
            Filtrar
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <CustomerList
          customers={customers}
          onDelete={handleDelete}
          onEdit={handleOpenEditModal}
        />
      )}

      <CustomerModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        initialData={selectedCustomer}
      />
    </Container>
  );
}
