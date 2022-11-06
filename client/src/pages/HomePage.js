import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FiltersContainer from "../components/FiltersContainer/FiltersContainer";

export default function HomePage(props) {
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <FiltersContainer/>
        </Col>
        <Col xs={12} md={8}>
          {/* to insert table list of hikes */}
        </Col>
      </Row>
    </Container>
  )
}