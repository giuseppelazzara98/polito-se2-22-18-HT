import React, { useState } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassPlus } from '@fortawesome/free-solid-svg-icons';
import GalleryModal from "./GalleryModal";

export default function ThumbnailAndGalleryModalComponent(props) {
  const { image } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.thumbnailWrap} onClick={() => setIsModalOpen(true)}>
        <img src={image} className={styles.thumbnailImage}/>
        <FontAwesomeIcon icon={faMagnifyingGlassPlus} className={styles.zoomIcon}/>
      </div>
      <GalleryModal open={isModalOpen} onClose={() => setIsModalOpen(false)} image={image}/>
    </>
  )
}