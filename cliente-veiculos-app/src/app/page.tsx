"use client";

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
import { useCustomerFilter } from "@/hooks/useCustomerFilter";
import { useCustomerModal } from "@/hooks/useCustomerModal";
import { useCustomerDeletion } from "@/hooks/useCustomerDeletion";

export default function Home() {
  const {
    customers,
    loading,
    loadCustomers,
    removeCustomer,
    addCustomer,
    updateCustomer,
  } = useCustomers();

  const { filter, onFilterChange, onKeyDown, applyFilter } =
    useCustomerFilter(loadCustomers);

  const {
    isModalOpen,
    selectedCustomer,
    openCreate,
    openEdit,
    close: closeModal,
    save: saveCustomer,
  } = useCustomerModal(addCustomer, updateCustomer);

  const { deleteCustomer } = useCustomerDeletion(removeCustomer);

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
          Cliente
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
          onClick={openCreate}
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
            placeholder="Buscar por nome, placa, CPF ou telefone..."
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            onKeyDown={onKeyDown}
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
            onClick={() => applyFilter()}
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
          onDelete={deleteCustomer}
          onEdit={openEdit}
        />
      )}

      <CustomerModal
        open={isModalOpen}
        onClose={closeModal}
        onSave={saveCustomer}
        initialData={selectedCustomer}
      />
    </Container>
  );
}
