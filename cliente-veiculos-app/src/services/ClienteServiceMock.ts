import { Cliente } from "@/types/customer";
import { IClienteService } from "./IClienteService";

let clientes: Cliente[] = [
  { id: "1", nome: "João Silva", telefone: "(22) 99999-9999", cpf: "123.456.789-00", placa: "ABC1D23" },
  { id: "2", nome: "Maria Souza", telefone: "(22) 88888-8888", cpf: "987.654.321-11", placa: "XYZ9A88" },
];

export function ClienteServiceMock(): IClienteService {
  const delay = () => new Promise((resolve) => setTimeout(resolve, 500));

  return {
    async listar(finalPlaca?: string): Promise<Cliente[]> {
      await delay();
      if (finalPlaca) {
        return clientes.filter((c) => c.placa.endsWith(finalPlaca));
      }
      return clientes;
    },

    async buscarPorId(id: string): Promise<Cliente | undefined> {
      await delay();
      return clientes.find((c) => c.id === id);
    },

    async criar(novoCliente: Omit<Cliente, "id">): Promise<Cliente> {
      await delay();
      const clienteComId = {
        ...novoCliente,
        id: Math.random().toString(36).substring(2, 9),
      };
      clientes.push(clienteComId);
      return clienteComId;
    },

    async atualizar(id: string, dados: Partial<Cliente>): Promise<Cliente> {
      await delay();
      const index = clientes.findIndex((c) => c.id === id);
      if (index === -1) throw new Error("Cliente não encontrado");
      
      clientes[index] = { ...clientes[index], ...dados };
      return clientes[index];
    },

    async remover(id: string): Promise<void> {
      await delay();
      clientes = clientes.filter((c) => c.id !== id);
    },
  };
}