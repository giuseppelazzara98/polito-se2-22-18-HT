import {
    Table,
    Button,
    Card,
    ListGroup,
    Container,
  } from "react-bootstrap";
  import { useState } from "react";
  
  function HikesTable(props) {
    return (
      <Container fluid>
  
          
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>Start place</th>
                  <th>End place </th>
                  <th>Length</th>
                  <th>Expected Time</th>
                  <th>Ascent</th>
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
        <tr>
          <td>{props.hike.startPlace}</td>
          <td>{props.hike.endPlace}</td>
          <td>{props.hike.pathLength}</td>
          <td>{props.hike.expTime}</td>
          <td>{props.hike.ascent}</td>
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