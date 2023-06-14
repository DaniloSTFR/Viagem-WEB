import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = ({ handleAlertResponse, isActive }: any) => {
  return (
    <div>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        {isActive ? (
          <p>Deseja mesmo desativar o funcionario?</p>
        ) : (
          <p>Deseja mesmo reativar o funcionario?</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => handleAlertResponse(false)} variant="secondary">
          Cancelar
        </Button>
        <Button onClick={() => handleAlertResponse(true)} variant="primary">
          Confirmar
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default ConfirmationModal;
