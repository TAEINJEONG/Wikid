import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Snackbar from '@/components/common/Snackbar';

type SnackbarType = 'gray' | 'green' | 'red';
type SnackbarPosition = 'top' | 'bottom';
type SnackbarSize = 'large' | 'small';

interface SnackbarItem {
  id: string;
  message: string;
  type: SnackbarType;
  position: SnackbarPosition;
  duration: number;
  size: SnackbarSize;
}

interface SnackbarContextProps {
  showSnackbar: (
    message: string,
    options?: {
      type?: SnackbarType;
      duration?: number;
      position?: SnackbarPosition;
      size?: SnackbarSize;
    },
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar는 SnackbarProvider 안에서만 사용 가능합니다.');
  }
  return context;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const isClient = useRef(false);

  useEffect(() => {
    isClient.current = true;
  }, []);

  const showSnackbar = useCallback(
    (
      message: string,
      {
        type = 'gray',
        duration = 3000,
        position = 'bottom',
        size = 'large',
      }: {
        type?: SnackbarType;
        duration?: number;
        position?: SnackbarPosition;
        size?: SnackbarSize;
      } = {},
    ) => {
      const id = crypto.randomUUID();

      setSnackbars((prev) => [...prev, { id, message, type, duration, position, size }]);

      setTimeout(() => {
        setSnackbars((prev) => prev.filter((s) => s.id !== id));
      }, duration);
    },
    [],
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {isClient.current &&
        createPortal(
          <div>
            {snackbars.map((snackbar) => (
              <Snackbar
                key={snackbar.id}
                type={snackbar.type}
                message={snackbar.message}
                duration={snackbar.duration}
                position={snackbar.position}
                size={snackbar.size}
                onClose={() => setSnackbars((prev) => prev.filter((s) => s.id !== snackbar.id))}
              />
            ))}
          </div>,
          document.body,
        )}
    </SnackbarContext.Provider>
  );
};
