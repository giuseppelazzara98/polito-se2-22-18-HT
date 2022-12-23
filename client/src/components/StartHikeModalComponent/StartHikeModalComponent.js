import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import styles from "./index.module.scss";


export default function StartHikeModalComponent (props) {
  
  return (
    <Modal
      {...props}                
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.title} closeButton onClick={()=>props.setShowStartHikeModal(false)}>
        

        <Modal.Title id="contained-modal-title-vcenter">
          Do you want to start this hike
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <Button onClick={()=>props.setShowStartHikeModal(false)}>Cancel</Button>
       <Button>Start</Button>
      </Modal.Body>
    </Modal>
  );
}
