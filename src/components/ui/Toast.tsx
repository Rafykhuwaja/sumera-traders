"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastProps } from '@/hooks/useToast';

interface ToastComponentProps extends ToastProps {
  onClose?: () => void;
}

const Toast: React.FC<ToastComponentProps> = ({ 
  message, 
  type, 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Show toast with animation
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Hide toast after duration
    const hideTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        onClose?.();
      }, 300); // Wait for exit animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = "flex items-center space-x-3 p-4 rounded-lg shadow-lg border backdrop-blur-sm";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-500/20 border-green-500/30 text-green-400`;
      case 'error':
        return `${baseStyles} bg-red-500/20 border-red-500/30 text-red-400`;
      case 'warning':
        return `${baseStyles} bg-yellow-500/20 border-yellow-500/30 text-yellow-400`;
      case 'info':
      default:
        return `${baseStyles} bg-blue-500/20 border-blue-500/30 text-blue-400`;
    }
  };

  const getIcon = () => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <XCircle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      case 'info':
      default:
        return <Info {...iconProps} />;
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out ${
        isVisible && !isLeaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className={getToastStyles()}>
        {getIcon()}
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;