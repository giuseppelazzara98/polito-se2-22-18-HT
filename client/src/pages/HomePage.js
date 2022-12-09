import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import FiltersContainer from "../components/FiltersContainer/FiltersContainer";
import { HikesTable } from "../components/HikesTable/hikestable";

export default function HomePage(props) {
  const {
    filters,
    setFilters,
    facets,
    provincesFacets,
    hikes,
    hikesForDistance,
    setHikes,
    setShowMapModal,
    setHikePointsInfo,
    municipalitiesFacets,
    setFetchMunicipalities,
  } = props;
  return (
    <Container>
      <Row>
        <Col xs={12} md={4}>
          <FiltersContainer
            hikesPoints={hikes.map((hike) => {
              return { key: hike.key, name: hike.name, lat: hike.position.latitude, long: hike.position.longitude };
            })}
            hikesForDistance={hikesForDistance.map((hike) => {
              return { key: hike.key, name: hike.name, lat: hike.position.latitude, long: hike.position.longitude };
            })}
            filters={filters}
            setFilters={setFilters}
            facets={facets}
            provincesFacets={provincesFacets}
            municipalitiesFacets={municipalitiesFacets}
            setFetchMunicipalities={setFetchMunicipalities}
          />
        </Col>
        <Col xs={12} md={8}>
          <HikesTable
            hikes={hikes}
            setHikes={setHikes}
            setShowMapModal={setShowMapModal}
            setHikePointsInfo={setHikePointsInfo}
            isHiker={props.isHiker}
          ></HikesTable>
        </Col>
      </Row>
    </Container>
  );
}
