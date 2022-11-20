import React from "react";
import { ModalBody, ModalHeader } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InfoModalComponent(props) {
  const {
    show,
    title = "",
    subtitle = "",
    icon,
    success = true,
  } = props;

  return (
    <Modal show={show} centered contentClassName={`${styles.modal} ${!success && styles.error}`}>
      {title && (
        <ModalHeader className={styles.title}>{title}</ModalHeader>
      )}
      {(subtitle || icon) && (
        <ModalBody className={styles.body}>
          {icon && <FontAwesomeIcon icon={icon} className={styles.icon}/>}
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </ModalBody>
      )}
    </Modal>
  )
}