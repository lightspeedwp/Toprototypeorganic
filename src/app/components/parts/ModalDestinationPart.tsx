/**
 * Modal Destination Part
 * Maps to: parts/modal-destination.html
 * 
 * Reusable accessible modal for destination-related interactions
 */

import { X } from '@phosphor-icons/react';
import { useEffect } from 'react';

interface ModalDestinationPartProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function ModalDestinationPart({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: ModalDestinationPartProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--elevation-lg)] max-w-2xl w-[calc(100%-var(--spacing-element-xl))] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-element-md flex items-center justify-between">
          <h2 id="modal-title">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-element-xs rounded-[var(--radius-md)] hover:bg-muted transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-element-lg">
          {children}
        </div>
      </div>
    </div>
  );
}