import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ChatModal = (props) => {
  const [show, setShow] = useState(false);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Coffee Chat AI ☕
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Provide information about your guest to generate personalized
          conversation topics and questions powered by AI. Craft your coffee
          chat to align with your guest's background, expertise, and meeting
          objectives.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="modal-btn" onClick={props.onHide}>
          Get Started
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
