"use client";
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && typeof document !== 'undefined') {
      document.body.classList.add('modal-open');
    } else if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('modal-open');
      }
    };
  }, [isOpen]);

  if (typeof document === 'undefined') {
    return null;
  }

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-[700px] w-full relative"
        ref={modalRef}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
