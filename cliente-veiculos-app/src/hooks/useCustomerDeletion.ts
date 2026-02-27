export interface UseCustomerDeletionHook {
  deleteCustomer: (id: string) => void;
}

export function useCustomerDeletion(
  removeCustomer: (id: string) => void,
): UseCustomerDeletionHook {
  function deleteCustomer(id: string) {
    if (confirm("Tem certeza que deseja remover este cliente?")) {
      removeCustomer(id);
    }
  }

  return { deleteCustomer };
}