"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Cliente } from "@/types/customer";

interface CustomerListProps {
  customers: Cliente[];
  onDelete: (id: string) => void;
  onEdit: (customer: Cliente) => void;
}

export function CustomerList({
  customers,
  onDelete,
  onEdit,
}: CustomerListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (customers.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 4, textAlign: "center", color: "text.secondary" }}
      >
        Nenhum cliente encontrado.
      </Paper>
    );
  }

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {customers.map((customer) => (
          <Card key={customer.id} elevation={2}>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {customer.nome}
                </Typography>
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => onEdit(customer)}
                    color="primary"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(customer.id)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                <strong>CPF:</strong> {customer.cpf}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Tel:</strong> {customer.telefone}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: "primary.main", fontWeight: "bold" }}
              >
                Placa: {customer.placa}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table>
        <TableHead sx={{ backgroundColor: "action.hover" }}>
          <TableRow>
            <TableCell>
              <strong>Nome</strong>
            </TableCell>
            <TableCell>
              <strong>CPF</strong>
            </TableCell>
            <TableCell>
              <strong>Telefone</strong>
            </TableCell>
            <TableCell>
              <strong>Placa</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Ações</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id} hover>
              <TableCell>{customer.nome}</TableCell>
              <TableCell>{customer.cpf}</TableCell>
              <TableCell>{customer.telefone}</TableCell>
              <TableCell>
                <code>{customer.placa}</code>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => onEdit(customer)}
                  color="primary"
                  title="Editar"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => onDelete(customer.id)}
                  color="error"
                  title="Excluir"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
