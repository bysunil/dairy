import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-5 fade-in duration-300 w-[90%] max-w-sm">
      <div className="bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl tactile-shadow-lg flex items-center gap-3 border-2 border-outline">
        <span className="material-symbols-outlined text-primary-container text-[24px]">info</span>
        <p className="font-label-md text-label-md flex-1">{message}</p>
        <button onClick={onClose} className="text-inverse-on-surface opacity-70 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
    </div>
  );
}
