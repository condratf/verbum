'use client';

import { useEffect, useRef, useState, createContext, useContext, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const ModalContext = createContext<{ open: (id: string, { title, content, ...props }: { title: string; content: React.ReactNode; [key: string]: any }) => void; close: (id: string) => void; closeAll: () => void } | null>(null);

export function ModalProvider({ children }: PropsWithChildren) {
  const [modals, setModals] = useState<{ id: string; title: string; content: React.ReactNode; [key: string]: any }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const open = (id: string, { title, content, ...props }: { title: string; content: React.ReactNode; [key: string]: any }) => {
    setModals((prev) => {
      const exists = prev.find((m) => m.id === id);
      if (exists) return prev;
      return [...prev, { id, title, content, ...props }];
    });
  };

  const close = (id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  const closeAll = () => {
    setModals([]);
  };

  return (
    <ModalContext.Provider value={{ open, close, closeAll }}>
      {children}
      {mounted && modals.map((modal) => (
        <ModalPortal key={modal.id} modal={modal} onClose={() => close(modal.id)} />
      ))}
    </ModalContext.Provider>
  );
}

function ModalPortal({ modal, onClose }: { modal: { id: string; title: string; content: React.ReactNode; [key: string]: any }; onClose: () => void }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const maxWidth = modal.maxWidth || 'max-w-md';

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
    >
      <div className={`relative bg-white rounded-lg shadow-2xl ${maxWidth} w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200`}>
        {modal.title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{modal.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className={`overflow-y-auto max-h-[calc(90vh-8rem)] ${modal.title ? 'p-6' : 'p-8'}`}>
          {modal.content}
        </div>
      </div>
    </div>,
    document.body
  );
}

// useModal Hook
export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}
