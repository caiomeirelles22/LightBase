import { useState, useMemo, useEffect } from "react";
import { debounce } from "@/utils/debounce";

export interface UseCustomerFilterHook {
  filter: string;
  setFilter: (value: string) => void;
  onFilterChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  applyFilter: (text?: string) => void;
}

export function useCustomerFilter(
  loadCustomers: (term: string) => void,
): UseCustomerFilterHook {
  const [filter, setFilter] = useState("");

  const debouncedLoad = useMemo(
    () =>
      debounce((term: string) => {
        loadCustomers(term);
      }, 500),
    [loadCustomers],
  );

  useEffect(() => {
    return () => debouncedLoad.cancel();
  }, [debouncedLoad]);

  function applyFilter(text?: string) {
    const t = (text ?? filter).trim();
    loadCustomers(t);
  }

  function onFilterChange(value: string) {
    setFilter(value);
    debouncedLoad(value.trim());
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      applyFilter();
    }
  }

  return { filter, setFilter, onFilterChange, onKeyDown, applyFilter };
}
