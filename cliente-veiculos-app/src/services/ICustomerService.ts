import { Customer } from "@/types/customer";

export interface ICustomerService {
  list(plateEnd?: string): Promise<Customer[]>;
  findById(id: string): Promise<Customer | undefined>;
  create(customer: Omit<Customer, "id">): Promise<Customer>;
  update(id: string, customer: Partial<Customer>): Promise<Customer>;
  remove(id: string): Promise<void>;
}