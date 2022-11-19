import {
    Table,
    Button,
    Card,
    ListGroup,
    Container,
  } from "react-bootstrap";
import { useState } from "react";
import styles from "./index.module.scss";
import { formatDuration ,formatAscent} from "../../helpers/utility";
  
  function HikesTable(props) {
    return (
      <div className={` ${styles.containerWrap}`}>
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
  function getDifficulty(diff){
    switch (diff){
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
  
  
  export { HikesTable };