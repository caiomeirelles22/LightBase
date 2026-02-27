import { useState } from "react";
import { Customer } from "@/types/customer";
import { CustomerFormData } from "@/utils/customerSchema";

export interface UseCustomerModalHook {
  isModalOpen: boolean;
  selectedCustomer: Customer | null;
  openCreate: () => void;
  openEdit: (customer: Customer) => void;
  close: () => void;
  save: (data: CustomerFormData) => Promise<void>;
}

export function useCustomerModal(
  addCustomer: (data: CustomerFormData) => Promise<void>,
  updateCustomer: (id: string, data: CustomerFormData) => Promise<void>,
): UseCustomerModalHook {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  function openCreate() {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  }

  function openEdit(customer: Customer) {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  }

  function close() {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  }

  async function save(data: CustomerFormData) {
    if (selectedCustomer) {
      await updateCustomer(selectedCustomer.id, data);
    } else {
      await addCustomer(data);
    }
    close();
  }

  return {
    isModalOpen,
    selectedCustomer,
    openCreate,
    openEdit,
    close,
    save,
  };
}