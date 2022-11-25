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
import { faMap } from '@fortawesome/free-solid-svg-icons';

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
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByDifficulty(props.hikes, false)); setOrder("Difficulty (Descending)") }}>Difficulty (Descending)</CDropdownItem>
            <CDropdownItem className={styles.orderBy} onClick={() => { props.setHikes(orderByProvince(props.hikes, false)); setOrder("Province (Descending)") }}>Province (Descending)</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </div>
      <div className={`table table-sm table-hover ${styles.wrap}`}>

        <div className={styles.dataName}>
          <span>Name</span>
          <span>Province</span>
          <span>Difficulty</span>
        </div>
        <div className={styles.bodyWrap}>
          {props.hikes.map((hike) => (
            <HikeRow
              hike={hike}
              key={hike.key}
              setShowMapModal={props.setShowMapModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HikeRow(props) {
  const [tab, setTab] = useState(false);

  return (
    <div className={styles.hikeRow}>
      <div className={styles.hikeFirstRow}>
        <span>{props.hike.name}</span>
        <span>{props.hike.province}</span>
        <span>{getDifficulty(props.hike.difficulty)}</span>
        <div>
        <Button
            className={styles.button}
            onClick={() => {
              props.setShowMapModal(true);
            }}
          >
            <FontAwesomeIcon icon={faMap}/>
          </Button>
        
          <Button
            className={styles.button}
            onClick={() => {
              setTab((value) => !value);
            }}
          >
            {tab ? "↑" : "↓"}
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
                <span>{props.hike.startPlace}</span>
                <span>{props.hike.endPlace}</span>
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
      return "turist"
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


export { HikesTable };