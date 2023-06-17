import React from "react";
import { Button, Modal } from "react-bootstrap";

type Props = {
  handleFunctionAlertResponse: Function;
  uid?: string;
  alertText: string;
  state:boolean;
}

const ConfirmationModal = ({ handleFunctionAlertResponse, uid = '', state, alertText}: Props) => {
  return (
    <div>
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <p>{alertText}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => handleFunctionAlertResponse(false, uid, state)} variant="secondary">
          Cancelar
        </Button>
        <Button onClick={() => handleFunctionAlertResponse(true, uid, state)} variant="primary">
          Confirmar
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default ConfirmationModal;
