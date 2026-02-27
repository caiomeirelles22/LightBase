import { Customer } from "@/types/customer";
import { ICustomerService } from "./ICustomerService";

const STORAGE_KEY = "@PlateSystem:customers";

const defaultData: Customer[] = [
  {
    id: "12345678",
    nome: "João Silva",
    telefone: "(22) 99999-9999",
    cpf: "123.456.789-00",
    placa: "ABC1D23",
  },
  {
    id: "23456789",
    nome: "Maria Souza",
    telefone: "(22) 88888-8888",
    cpf: "987.654.321-11",
    placa: "XYZ9A88",
  },
];

export function CustomerServiceMock(): ICustomerService {
  const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

  function getStoredData(): Customer[] {
    if (typeof window === "undefined") return defaultData;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultData;
  }

  function setStoredData(data: Customer[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }

  return {
    async list(searchTerm?: string): Promise<Customer[]> {
      await delay();
      const customers = getStoredData();

        const term = searchTerm?.trim();
      if (term) {
        const lowSearch = term.toLowerCase();

        return customers.filter((c) => {
          const cleanCPF = c.cpf.replace(/\D/g, "");
          const cleanPhone = c.telefone.replace(/\D/g, "");
          const cleanSearch = lowSearch.replace(/\D/g, "");

          return (
            c.nome.toLowerCase().includes(lowSearch) ||
            c.placa.toLowerCase().includes(lowSearch) ||
            (cleanSearch !== "" && cleanCPF.includes(cleanSearch)) ||
            (cleanSearch !== "" && cleanPhone.includes(cleanSearch))
          );
        });
      }

      return customers;
    },

    async findById(id: string): Promise<Customer | undefined> {
      await delay();
      return getStoredData().find((c) => c.id === id);
    },

    async create(newCustomer: Omit<Customer, "id">): Promise<Customer> {
      await delay();
      const customers = getStoredData();

      const generatedId = Math.floor(
        10000000 + Math.random() * 90000000,
      ).toString();

      const customerWithId = {
        ...newCustomer,
        id: generatedId,
      };

      const updatedData = [...customers, customerWithId];
      setStoredData(updatedData);
      return customerWithId;
    },

    async update(id: string, data: Partial<Customer>): Promise<Customer> {
      await delay();
      const customers = getStoredData();
      const index = customers.findIndex((c) => c.id === id);

      if (index === -1) throw new Error("Customer not found");

      customers[index] = { ...customers[index], ...data };
      setStoredData(customers);
      return customers[index];
    },

    async remove(id: string): Promise<void> {
      await delay();
      const customers = getStoredData();
      const updatedData = customers.filter((c) => c.id !== id);
      setStoredData(updatedData);
    },
  };
}
