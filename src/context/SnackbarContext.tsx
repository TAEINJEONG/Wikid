// src/context/SnackbarContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Snackbar from '@/components/common/Snackbar';

type SnackbarType = 'gray' | 'green' | 'red';
type SnackbarPosition = 'top' | 'bottom';

interface SnackbarItem {
  id: number;
  message: string;
  type: SnackbarType;
  position: SnackbarPosition;
  duration: number;
}

interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    options?: {
      type?: SnackbarType;
      duration?: number;
      position?: SnackbarPosition;
    },
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const showSnackbar = useCallback(
    (
      message: string,
      {
        type = 'gray',
        duration = 3000,
        position = 'top',
      }: {
        type?: SnackbarType;
        duration?: number;
        position?: SnackbarPosition;
      } = {},
    ) => {
      const id = Date.now();
      setSnackbars((prev) => [...prev, { id, message, type, duration, position }]);

      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== id));
      }, duration);
    },
    [],
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {typeof window !== 'undefined' &&
        createPortal(
          <div>
            {snackbars.map((snackbar) => (
              <Snackbar
                key={snackbar.id}
                type={snackbar.type}
                message={snackbar.message}
                duration={snackbar.duration}
                position={snackbar.position}
                onClose={() => setSnackbars((prev) => prev.filter((s) => s.id !== snackbar.id))}
              />
            ))}
          </div>,
          document.body,
        )}
    </SnackbarContext.Provider>
  );
};
