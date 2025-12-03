import { useEffect } from 'react';
import './Toast.css';

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      <div className="toast-content">
        <span className="toast-icon">⛧</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
