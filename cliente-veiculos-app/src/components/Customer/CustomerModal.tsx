"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid as Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerSchema, CustomerFormData } from "@/utils/customerSchema";
import { Customer } from "@/types/customer";

interface CustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CustomerFormData) => Promise<void>;
  initialData?: Customer | null;
}

export function CustomerModal({
  open,
  onClose,
  onSave,
  initialData,
}: CustomerModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      telefone: "",
      placa: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ nome: "", cpf: "", telefone: "", placa: "" });
    }
  }, [initialData, reset, open]);

  async function onSubmit(data: CustomerFormData) {
    await onSave(data);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Editar Cliente" : "Novo Cliente"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nome Completo"
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="cpf"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="CPF"
                    error={!!errors.cpf}
                    helperText={errors.cpf?.message}
                    inputProps={{ maxLength: 14 }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="telefone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Telefone"
                    error={!!errors.telefone}
                    helperText={errors.telefone?.message}
                    inputProps={{ maxLength: 15 }}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="placa"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Placa do Carro"
                    placeholder="AAA0A00"
                    error={!!errors.placa}
                    helperText={
                      errors.placa?.message || "Padrão Mercosul ou Antigo"
                    }
                    slotProps={{
                      htmlInput: { style: { textTransform: "uppercase" } },
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Cliente"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
