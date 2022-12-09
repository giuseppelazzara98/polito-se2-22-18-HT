import React from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faSquarePlus,faBed,faParking } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery }  from "react-responsive";
import { maxBreakpoints } from "../../helpers/configs";
import { useNavigate } from 'react-router-dom';

export default function UserMenu(props) {
  const {
    user,
    handleLogOut,
  } = props;
  const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });
  const navigate=useNavigate();

  return (
    <div className={styles.userContainer}>
      <div className={`btn ${styles.userInfoContainer}`}>
        {!isMobile && <span className={styles.userName}>{user.name} {user.surname}</span>}
        <FontAwesomeIcon icon={faUser}/>
      </div>
      <div className={styles.optionModal}>
        {isMobile && <span className={styles.userName}>{user.name} {user.surname}</span>}
        <div className={styles.option} onClick={() => navigate("/newHike")}>
          <span className={styles.label}>New Hike </span>
               <FontAwesomeIcon icon={faSquarePlus} className={styles.iconOption}/>
          
        </div>
        <div className={styles.option} onClick={() => navigate("/newHut")}>
          <span className={styles.label}>New Hut</span>
            <FontAwesomeIcon icon={faBed} className={styles.iconOption}/>  
        </div>
        <div className={styles.option} onClick={() => navigate("/newParkingLot")}>
          <span className={styles.label}>New Parking Lot</span>
          <FontAwesomeIcon icon={faParking} className={styles.iconOption}/>
        </div>
        <div className={styles.option} onClick={() => handleLogOut()}>
          <span className={styles.label}>Logout</span>
          <FontAwesomeIcon icon={faRightFromBracket} className={styles.iconOption}/>
        </div>
      </div>
    </div>
  )
}