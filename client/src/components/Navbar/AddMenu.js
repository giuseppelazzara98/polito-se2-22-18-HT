import React from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMountain, faBed, faParking, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from "react-responsive";
import { maxBreakpoints } from "../../helpers/configs";
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddMenu(props) {
  const {
    user,
  } = props;
  const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.userContainer}>
      <div className={`btn ${styles.userInfoContainer}`}>
        {!isMobile && <span className={styles.userName}></span>}
        <FontAwesomeIcon icon={faCirclePlus} className={styles.addIcon} />
      </div>
      <div className={styles.optionModal}>
        {isMobile && <span className={styles.userName}>{user.name} {user.surname}</span>}
        {user.role === 'Local guide' && (
          <>
            {location.pathname !== "/newHike" && (
              <div className={styles.option} onClick={() => navigate("/newHike")}>
                <span className={styles.label}>New Hike </span>
                <FontAwesomeIcon icon={faMountain} className={styles.iconOption} />
              </div>
            )}
            {location.pathname !== "/newHut" && (
              <div className={styles.option} onClick={() => navigate("/newHut")}>
                <span className={styles.label}>New Hut</span>
                <FontAwesomeIcon icon={faBed} className={styles.iconOption} />
              </div>
            )}
            {location.pathname !== "/newParkingLot" && (
              <div className={styles.option} onClick={() => navigate("/newParkingLot")}>
                <span className={styles.label}>New Parking Lot</span>
                <FontAwesomeIcon icon={faParking} className={styles.iconOption} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}