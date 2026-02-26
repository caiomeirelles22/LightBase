"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Cliente } from "@/types/customer";
import { IClienteService } from "@/services/IClienteService";
import { ClienteServiceMock } from "@/services/ClienteServiceMock";

interface CustomerContextData {
  customers: Cliente[];
  loading: boolean;
  loadCustomers: (finalPlaca?: string) => Promise<void>;
  addCustomer: (customer: Omit<Cliente, "id">) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Cliente>) => Promise<void>;
  removeCustomer: (id: string) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData,
);

const clienteService: IClienteService = ClienteServiceMock();

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCustomers(finalPlaca?: string) {
    setLoading(true);
    try {
      const data = await clienteService.listar(finalPlaca);
      setCustomers(data);
    } finally {
      setLoading(false);
    }
  }

  async function addCustomer(customer: Omit<Cliente, "id">) {
    const newCustomer = await clienteService.criar(customer);
    setCustomers((prev) => [...prev, newCustomer]);
  }

  async function updateCustomer(id: string, data: Partial<Cliente>) {
    const updated = await clienteService.atualizar(id, data);
    setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }

  async function removeCustomer(id: string) {
    await clienteService.remover(id);
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        loadCustomers,
        addCustomer,
        updateCustomer,
        removeCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  return useContext(CustomerContext);
}
