import React from "react";
import { ModalBody, ModalHeader } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseButton from 'react-bootstrap/CloseButton';
import Map from "../MapComponent/Map";


export default function MapModalComponent (props) {
  const { markers } = props;
  return (
    <Modal
      {...props}                
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.title} closeButton onClick={()=>props.setShowMapModal(false)}>
        

        <Modal.Title id="contained-modal-title-vcenter">
          Map
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       {markers?.length > 0 && <Map markers={markers}/>}
      </Modal.Body>
    </Modal>
  );
}
