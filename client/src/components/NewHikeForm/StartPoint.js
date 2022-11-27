import { Form, Col, Row, FloatingLabel } from "react-bootstrap";
import { useEffect, useState } from "react";
import Select from "react-select";
import API from "../../API/api";
import styles from "./index.module.scss";
import MapSearch from "./MapSearch";

export default function StartPoint(props) {
  const { validated, startPoint, endPoint, referencePoints } = props;
  const [points, setPoints] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const max = 50000;
  const min = 1000;

  const optionStartPoint = [
    {
      value: "",
      label: "-- Select point type --",
    },
    {
      value: "Hut/Parking lot",
      label: "Hut/Parking lot",
    },
    {
      value: "Address/Name of location",
      label: "Address/Name of location",
    },
    {
      value: "GPS coordinates",
      label: "GPS coordinates",
    },
  ];

  useEffect(() => {
    const loadPoints = () => {
      API.getPointsByProvinceId(props.province)
        .then((list) => {
          return list.map((item) => {
            return {
              label: item.name,
              value: item.id_place,
              lat: item.latitude,
              lon: item.longitude,
            };
          });
        })
        .then((newList) => {
          setPoints(newList);
        });
    };
    if (props.province !== "") {
      loadPoints();
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [props.province]);

  return (
    <>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label className={styles.title}>Start point</Form.Label>
                <Select
                  className={`${styles.customSelect} ${
                    validated &&
                    (startPoint?.type === "" ||
                      Object.keys(startPoint).length === 0) &&
                    styles.invalid
                  } ${
                    validated &&
                    Object.keys(startPoint).length > 0 &&
                    startPoint.type !== "" &&
                    styles.valid
                  }`}
                  classNamePrefix="select"
                  defaultValue={props?.startPoint?.value}
                  placeholder="-- Select point type --"
                  onChange={(event) => {
                    props.setStartPoint({
                      type: event.value,
                      lat: "",
                      lon: "",
                      name: "",
                    });
                  }}
                  isDisabled={isDisabled}
                  options={optionStartPoint}
                  required
                ></Select>
                {validated &&
                  (startPoint?.type === "" ||
                    Object.keys(startPoint).length === 0) && (
                    <div className={styles.feedbackContainer}>
                      <span className={styles.feedback}>
                        Please select a valid type
                      </span>
                    </div>
                  )}
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        {props.startPoint.type === "Hut/Parking lot" && (
          <Col>
            <Form.Group>
              <Form.Label className={styles.title}>Select a point</Form.Label>
              <Select
                className={`${styles.customSelect} ${
                  validated &&
                  (startPoint?.type === "" ||
                    Object.keys(startPoint).length === 0 ||
                    (startPoint.type === "Hut/Parking lot" &&
                      (startPoint.lat === "" || startPoint.lon === ""))) &&
                  styles.invalid
                } ${
                  validated &&
                  Object.keys(startPoint).length > 0 &&
                  startPoint.type === "Hut/Parking lot" &&
                  (startPoint.lat !== "" || startPoint.lon !== "") &&
                  styles.valid
                }`}
                placeholder="Select a point"
                classNamePrefix="select"
                defaultValue={props.startPoint.id}
                name="startPoint"
                isSearchable={true}
                isDisabled={isDisabled}
                options={points
                  .filter((item) => item.value !== endPoint.id)
                  .filter((item) => {
                      for (let i = 0; i < referencePoints.length; i++) {
                        if (item.value === referencePoints[i].id) {
                          return false;
                        }
                      }
                    
                    return true;
                  })}
                onChange={(event) => {
                  props.setStartPoint({
                    type: props.startPoint.type,
                    id: event.value,
                    name: event.label,
                    lon: event.lon,
                    lat: event.lat,
                  });
                }}
              />
              {validated &&
                (startPoint?.type === "" ||
                  Object.keys(startPoint).length === 0 ||
                  (startPoint.type === "Hut/Parking lot" &&
                    (startPoint.lat === "" || startPoint.lon === ""))) && (
                  <div className={styles.feedbackContainer}>
                    <span className={styles.feedback}>
                      Please select a valid point
                    </span>
                  </div>
                )}
            </Form.Group>
          </Col>
        )}
        {props.startPoint.type === "Address/Name of location" && (
          <Col>
            <Form.Group>
              <Form.Label className={styles.title}>
                Address/Name of location
              </Form.Label>
              <MapSearch
                validated={validated}
                point={props.startPoint}
                setPoint={props.setStartPoint}
              />
            </Form.Group>
          </Col>
        )}
        {props.startPoint.type === "GPS coordinates" && (
          <>
            <Col>
              <Form.Group>
                <Form.Label className={styles.title}>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  value={props.startPoint.lon}
                  placeholder="Longitude"
                  onChange={(event) => {
                    props.setStartPoint({
                      type: props.startPoint.type,
                      id:
                        props.startPoint.id === undefined
                          ? Math.floor(Math.random() * (max - min) + min)
                          : props.startPoint.id,
                      name: props.startPoint.name,
                      lon: event.target.value,
                      lat: props.startPoint.lat,
                    });
                  }}
                  required={props.startPoint.type === "GPS coordinates"}
                  min={-180}
                  max={180}
                  step={0.0001}
                />
                <Form.Control.Feedback type="invalid">
                  Please insert a valid Longitude
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className={styles.title}>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  value={props.startPoint.lat}
                  placeholder="Latitude"
                  onChange={(event) => {
                    props.setStartPoint({
                      type: props.startPoint.type,
                      id:
                        props.startPoint.id === undefined
                          ? Math.floor(Math.random() * (max - min) + min)
                          : props.startPoint.id,
                      name: props.startPoint.name,
                      lat: event.target.value,
                      lon: props.startPoint.lon,
                    });
                  }}
                  required={props.startPoint.type === "GPS coordinates"}
                  min={-90}
                  max={90}
                  step={0.0001}
                />
                <Form.Control.Feedback type="invalid">
                  Please insert a valid Latitude
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </>
        )}
      </Row>
    </>
  );
}
