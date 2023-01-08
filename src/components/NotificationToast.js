import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useAuth } from '../contexts/AuthContext';

function NotificationToast() {
  const {toastMessage, showNotificationToast, setShowNotificationToast} = useAuth();
  const {variant, messageType, message} = toastMessage;

  return (
    <>
        <ToastContainer className="p-3" position='bottom-end'>
          <Toast onClose={() => setShowNotificationToast(false)} show={showNotificationToast}  animation={true} bg={variant.toLowerCase()} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">{messageType}</strong>
            </Toast.Header>
            <Toast.Body className={variant === 'Dark' ? 'text-white' : 'text-dark'}>{message}</Toast.Body>
          </Toast>
        </ToastContainer>
    </>
  );
}

export default NotificationToast;