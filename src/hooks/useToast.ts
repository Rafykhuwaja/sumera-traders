"use client";

import { useState, useCallback } from 'react';

export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = useCallback((toastProps: ToastProps) => {
    setToast(toastProps);
    
    // Auto-hide toast after duration (default 3 seconds)
    const duration = toastProps.duration || 3000;
    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return {
    toast,
    showToast,
    hideToast,
  };
};