import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
  onClose: () => void;
};

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Allow for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className={`fixed top-4 right-4 z-50 flex items-center p-4 min-w-[320px] rounded-lg shadow-md transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}
      role="alert"
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
      ) : (
        <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
      )}
      <div className="ml-2 text-sm font-medium">{message}</div>
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-auto -mx-1.5 -my-1.5 p-1.5 hover:bg-gray-100 rounded-lg inline-flex h-8 w-8 text-gray-500"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export type ToastState = {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
};

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  return { toast, showToast, hideToast };
};
