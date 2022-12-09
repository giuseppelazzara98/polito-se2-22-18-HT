import React, { useMemo } from "react";
import Modal from 'react-bootstrap/Modal';
import styles from "./index.module.scss";
import Map from "../MapComponent/Map";


export default function MapModalComponent (props) {
  const { hikePointsInfo } = props;

  const { markers, gpxPoints } = useMemo(() => {
    let markers = [];
    let gpxPoints = [];

    if (Object.keys(hikePointsInfo).length > 0) {
      markers = hikePointsInfo.hikePoints?.sort((point1, point2) => {
        if (point1.startPoint || point2.endPoint) {
          return -1;
        }
        if (point1.endPoint || point2.startPoint) {
          return 1;
        }
        return 0;
      }) || [];
      gpxPoints = hikePointsInfo.gpx ? JSON.parse(hikePointsInfo.gpx) : [];
    }

    return {markers, gpxPoints};
  }, [JSON.stringify(hikePointsInfo)]);

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
       {(markers?.length > 0 || gpxPoints?.length > 0) && <Map markers={markers} gpxPoints={gpxPoints}/>}
      </Modal.Body>
    </Modal>
  );
}
