import React, { ReactNode } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { AppConfig } from "../../../config/app.config";

export default function CustomToast({
  title,
  show = false,
  onClose,
  children,
}: {
  title?: string;
  show?: boolean;
  onClose?: Function;
  children?: ReactNode;
}) {
  const handleShow = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <ToastContainer>
      <Toast show={show} onClose={handleShow} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">{title ?? AppConfig().app.name}</strong>
          {/* <small className="text-muted">just now</small> */}
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
