import {
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { useState } from "react";
import styles from "./index.module.scss";
import { formatDuration } from "../../helpers/utility";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faMap,faPlus} from '@fortawesome/free-solid-svg-icons';
import API from "../../API/api";

function HikesTable(props) {
  const [order, setOrder] = useState("Province (Ascending)");
  return (
    <div className={` ${styles.containerWrap}`}>
      <div className="d-flex justify-content-end">
        <CDropdown className={styles.dropdown}>
          <CDropdownToggle className={styles.button}> Order by: {order}</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByDifficulty(props.hikes, true)); setOrder("Difficulty (Ascending)") }}>Difficulty (Ascending)</CDropdownItem>
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByProvince(props.hikes, true)); setOrder("Province (Ascending)") }}>Province (Ascending)</CDropdownItem>
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByMunicipality(props.hikes, true)); setOrder("Municipality (Ascending)") }}>Municipality (Ascending)</CDropdownItem>
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByDifficulty(props.hikes, false)); setOrder("Difficulty (Descending)") }}>Difficulty (Descending)</CDropdownItem>
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByProvince(props.hikes, false)); setOrder("Province (Descending)") }}>Province (Descending)</CDropdownItem>
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByMunicipality(props.hikes, false)); setOrder("Municipality (Descending)") }}>Municipality (Descending)</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
      <div className={`table table-sm table-hover ${styles.wrap}`}>

        <div className={styles.dataName}>
          <span>Name</span>
          <span>Province</span>
          <span>Municipality</span>
          <span>Difficulty</span>
        </div>
        <div className={styles.bodyWrap}>
          {props.hikes.map((hike) => (
            <HikeRow
              hike={hike}
              key={hike.key}
              setShowMapModal={props.setShowMapModal}
              setShowRegisterHikeModal={props.setShowRegisterHikeModal}
              setHikePointsInfo={props.setHikePointsInfo}
              isHiker={props.isHiker}
              setMyHikeId={props.setMyHikeId}
            />
          ))}
          {props.hikes?.length === 0 && (
            <div className={styles.hikeRow}>
              <span>There is no result</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HikeRow(props) {
  const [tab, setTab] = useState(false);

  const handleOpenMapModal = () => {
    API.getHikePointsInfo(props.hike.key).then(response => {
      props.setHikePointsInfo(response);
    });
  }

  return (
    <div className={styles.hikeRow}>
      <div className={styles.hikeFirstRow}>
        <span>{props.hike.name}</span>
        <span>{props.hike.province}</span>
        <span>{props.hike.municipality}</span>
        <span>{getDifficulty(props.hike.difficulty)}</span>
        <div className={styles.flexcontainer}>
        {props.isHiker ? (
          <>
        <Button
            className={styles.addHikeButton}
            onClick={() => {
              props.setShowRegisterHikeModal(true);
              props.setMyHikeId(props.hike.id_hike);
              
            }}
          >
            <FontAwesomeIcon icon={faPlus}/>
          </Button>
          <Button
            className={styles.mapButton}
            onClick={() => {
              props.setShowMapModal(true);
              handleOpenMapModal();
            }}
          >
            <FontAwesomeIcon icon={faMap}/>
          </Button>
          </>
        ): (
          ""
        )}
        
          <Button
            className={styles.button}
            onClick={() => {
              setTab((value) => !value);
            }}
          >
            <FontAwesomeIcon icon={faCircleInfo} className={styles.iconInfo}/>
          </Button>
        </div>
      </div>
      {tab ? (
        <div className=" border border-0">
          <Card className="customized-color">
            <div className={styles.innerTable}>
              <div className={styles.headerHinner}>
                <span>Start Place</span>
                <span>End Place</span>
                <span>Path Length</span>
                <span>Expected Time</span>
                <span>Ascent</span>
              </div>
              <div className={styles.bodyHinner}>
                <span>{returnName(props.hike, true)}</span>
                <span>{returnName(props.hike, false)}</span>
                <span>{props.hike.pathLength} km</span>
                <span>{formatDuration(props.hike.expTime)}</span>
                <span>{(props.hike.ascent)} m </span>
              </div>
            </div>
            <Card.Header>Description</Card.Header>{" "}
            <ListGroup variant="flush">
              {" "}
              <ListGroup.Item>{props.hike.description}</ListGroup.Item>

            </ListGroup>
          </Card>
        </div>
      ) : (
        ""
      )}
    </div>
  );

}
function getDifficulty(diff) {
  switch (diff) {
    case 1:
      return "tourist"
    case 2:
      return "hiker"
    case 3:
      return "professional hiker"
    default:
      return ""
  }
}


function orderByProvince(hikes, isAscending) {
  let newHikes = [];
  if (isAscending) {
    newHikes = hikes.sort((a, b) => a.province.localeCompare(b.province));
  } else {
    newHikes = hikes.sort((a, b) => b.province.localeCompare(a.province));
  }
  return newHikes;
}

function orderByDifficulty(hikes, isAscending) {
  let newHikes = [];
  if (isAscending) {
    newHikes = [...hikes].sort((a, b) => a.difficulty - b.difficulty);
  }
  else {
    newHikes = [...hikes].sort((a, b) => b.difficulty - a.difficulty);
  }
  return newHikes;
}
function returnName(hike, isStart) {
  if (hike.startPlace === ""){
    return hike.province
  }
  else {
    if(isStart){
      return hike.startPlace
    }
    else {
      return hike.endPlace
    }
  }
}


function orderByMunicipality(hikes, isAscending) {
  let newHikes = [];
  if (isAscending) {
    newHikes = hikes.sort((a, b) => a.municipality.localeCompare(b.municipality));
  } else {
    newHikes = hikes.sort((a, b) => b.municipality.localeCompare(a.municipality));
  }
  return newHikes;
}


export { HikesTable };