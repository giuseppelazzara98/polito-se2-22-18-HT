import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FiltersContainer from "../components/FiltersContainer/FiltersContainer";
import { HikesTable } from "../components/HikesTable/hikestable";

export default function HomePage(props) {
  const {filters, setFilters} = props;
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <FiltersContainer filters={filters} setFilters={setFilters}/>
        </Col>
        <Col xs={12} md={8}>
          <HikesTable hikes={props.hikes}></HikesTable>
        </Col>
      </Row>
    </Container>
  )
}