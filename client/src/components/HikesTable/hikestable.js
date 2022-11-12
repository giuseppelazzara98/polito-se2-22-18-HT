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
      <Container fluid>
  
          
            <Table hover size="sm" className={styles.wrap}>
              <thead className={styles.dataName}>
                <tr>
                  <th>Name</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {props.hikes.map((hike) => (
                  <HikeRow
                    hike={hike}
                    key={hike.key}
                  />
                ))}
              </tbody>
            </Table>
      </Container>
    );
  }
  
  function HikeRow(props) {
    const [tab, setTab] = useState(false);
    
    return (
      <>
        <tr className={styles.wrap}>
          <td>{props.hike.name}</td>
          <td>{getDifficulty(props.hike.difficulty)}</td>
          
          <td>
            {" "}
            <Button 
             className={styles.button} 
              onClick={() => {
                setTab((value) => !value);
              }}
            >
              {tab ? "↑" : "↓"}
            </Button>
          </td>
 
        </tr>
        {tab ? (
          <tr>
            <td colSpan={8} className=" border border-bottom-0  rounded-pill">
              {" "}
              <Card className="customized-color">
               
                <Table>
                <tr>
                  <th>Start Place</th>
                  <th>End Place</th>
                  <th>Path Length</th>
                  <th>Expected Time</th>
                  <th>Ascent</th>
                </tr>
                <tr>
                  <td>{props.hike.startPlace}</td>
                  <td>{props.hike.endPlace}</td>
                  <td>{props.hike.pathLength} km</td>
                  <td>{formatDuration(props.hike.expTime)}</td>
                  <td>{formatAscent(props.hike.ascent)}</td>
                </tr>
                </Table>
                <Card.Header>Description</Card.Header>{" "}
                <ListGroup variant="flush">
                  {" "}
                    <ListGroup.Item>{props.hike.description}</ListGroup.Item>
                    
                </ListGroup>
              </Card>
            </td>
          </tr>
        ) : (
          ""
        )}
      </>
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