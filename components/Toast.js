import { useState, useRef, useEffect, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  useEffect(() => {
    if (toast === null) return;

    if (timer.current) {
      clearTimeout(timer.current);
    }

    const id = setTimeout(() => {
      setToast(null);
    }, 3000);

    timer.current = id;

    return () => clearTimeout(id);
  }, [toast]);

  const show = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  return {
    toast,
    show,
  };
}
