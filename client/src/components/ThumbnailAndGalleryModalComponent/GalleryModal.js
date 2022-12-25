import React from "react";
import Modal from 'react-bootstrap/Modal';
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function GalleryModal (props) {
  const { onClose, image, open } = props;

  return (
    <Modal            
      size="lg"
      centered
      onHide={() => onClose()}
      contentClassName={styles.galleryModal}
      show={open}
    >
      <button className={styles.closeButton} onClick={() => onClose()}>
        <FontAwesomeIcon icon={faXmark}/>
      </button>
      <img src={image} className={styles.image}/>
    </Modal>
  );
}
