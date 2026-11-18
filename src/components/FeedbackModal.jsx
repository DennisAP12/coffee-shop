import React from 'react';
import './FeedbackModal.css';

export default function FeedbackModal({ isOpen, onClose, title, message, type = 'info' }) {
  if (!isOpen) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-icon ${type}`}>
          {icons[type]}
        </div>
        {title && <h2 className="modal-title">{title}</h2>}
        <p className="modal-message">{message}</p>
        <button className="modal-button" onClick={onClose}>
          Aceptar
        </button>
      </div>
    </div>
  );
}
