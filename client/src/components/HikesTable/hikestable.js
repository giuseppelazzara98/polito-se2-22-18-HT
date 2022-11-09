import {
    Table,
    Button,
    Card,
    ListGroup,
    Container,
  } from "react-bootstrap";
  import { useState } from "react";
  import styles from "./index.module.scss";
  
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
          
          
          <td>{props.hike.difficulty}</td>
          
          <td>
            {" "}
            <Button 
              variant="secondary"
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
                  <td>{props.hike.pathLength}</td>
                  <td>{props.hike.expTime}</td>
                  <td>{props.hike.ascent}</td>
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
  
  
  export { HikesTable };