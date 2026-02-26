import { Cliente } from "@/types/customer";

export interface IClienteService {
  listar(finalPlaca?: string): Promise<Cliente[]>;
  buscarPorId(id: string): Promise<Cliente | undefined>;
  criar(cliente: Omit<Cliente, "id">): Promise<Cliente>;
  atualizar(id: string, cliente: Partial<Cliente>): Promise<Cliente>;
  remover(id: string): Promise<void>;
}