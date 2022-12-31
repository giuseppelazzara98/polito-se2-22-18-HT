import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import styles from "./index.module.scss";
import API from "../../API/api";


export default function RegisterHikeModalComponent (props) {
  const {
    setShowRegisterHikeError,
    setShowRegisterHikeSuccess,
    setShowRegisterHikeModal,
    myHikeId
  }=props;

  const handleSubmit = (event) => {
    setShowRegisterHikeModal(false);
    API.registerHike({id_hike:myHikeId}).then((response) => {
      API.getOwnedHikes().then((res) => {
        props.setHikesOwned(res);
    })
      setShowRegisterHikeSuccess(true);
      setTimeout(() => {
        setShowRegisterHikeSuccess(false)
      }, 2500);
    }).catch(() => {
      setShowRegisterHikeError(true);
      setTimeout(() => {
        setShowRegisterHikeError(false)
      }, 2500);
    });
  }

  return (
    <Modal
      {...props}                
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.title} closeButton onClick={()=>setShowRegisterHikeModal(false)}>
        

        <Modal.Title id="contained-modal-title-vcenter">
          Do you want to add this hike to your personal hikes?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Button onClick={()=>handleSubmit()}>Register</Button>
       <Button onClick={()=>setShowRegisterHikeModal(false)}>Cancel</Button>
      </Modal.Body>
    </Modal>
  );
}
