import React from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery }  from "react-responsive";
import { maxBreakpoints } from "../../helpers/configs";

export default function UserMenu(props) {
  const {
    user,
    handleLogOut,
  } = props;
  const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });

  return (
    <div className={styles.userContainer}>
      <div className={`btn ${styles.userInfoContainer}`}>
        {!isMobile && <span className={styles.userName}>{user.name} {user.surname}</span>}
        <FontAwesomeIcon icon={faUser}/>
      </div>
      <div className={styles.optionModal}>
        {isMobile && <span className={styles.userName}>{user.name} {user.surname}</span>}
        <div className={styles.option} onClick={() => handleLogOut()}>
          <span className={styles.label}>Logout</span>
          <FontAwesomeIcon icon={faRightFromBracket} className={styles.iconOption}/>
        </div>
      </div>
    </div>
  )
}