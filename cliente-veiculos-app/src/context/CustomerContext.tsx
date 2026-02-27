"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Customer } from "@/types/customer";
import { ICustomerService } from "@/services/ICustomerService";
import { CustomerServiceMock } from "@/services/CustomerServiceMock";

interface CustomerContextData {
  customers: Customer[];
  loading: boolean;
  loadCustomers: (finalPlaca?: string) => Promise<void>;
  addCustomer: (customer: Omit<Customer, "id">) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  removeCustomer: (id: string) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextData>(
  {} as CustomerContextData,
);

const costumerService: ICustomerService = CustomerServiceMock();

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadCustomers(finalPlaca?: string) {
    setLoading(true);
    try {
      const data = await costumerService.list(finalPlaca);
      setCustomers(data);
    } finally {
      setLoading(false);
    }
  }

  async function addCustomer(customer: Omit<Customer, "id">) {
    const newCustomer = await costumerService.create(customer);
    setCustomers((prev) => [...prev, newCustomer]);
  }

  async function updateCustomer(id: string, data: Partial<Customer>) {
    const updated = await costumerService.update(id, data);
    setCustomers((prev) => prev.map((c) => (c.id === id ? updated : c)));
  }

  async function removeCustomer(id: string) {
    await costumerService.remove(id);
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
