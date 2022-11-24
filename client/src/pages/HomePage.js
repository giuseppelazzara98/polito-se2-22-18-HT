import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FiltersContainer from "../components/FiltersContainer/FiltersContainer";
import { HikesTable } from "../components/HikesTable/hikestable";

export default function HomePage(props) {
  const {filters, setFilters, facets, provincesFacets, municipalitiesFacets, setFetchMunicipalities, hikes, setHikes} = props;
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <FiltersContainer filters={filters} setFilters={setFilters} facets={facets} provincesFacets={provincesFacets} municipalitiesFacets={municipalitiesFacets} setFetchMunicipalities={setFetchMunicipalities} />
        </Col>
        <Col xs={12} md={8}>
          <HikesTable hikes={hikes} setHikes={setHikes}></HikesTable>
        </Col>
      </Row>
    </Container>
  )
}