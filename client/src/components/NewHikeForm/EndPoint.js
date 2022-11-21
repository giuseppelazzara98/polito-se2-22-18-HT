import { Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';
import MapSearch from './MapSearch';

export default function EndPoint(props) {
	const {
		validated,
		endPoint
	} = props;
	const [points, setPoints] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);

	const optionEndPoint = [
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
	]

	useEffect(() => {
		const loadPoints = () => {
			API.getPointsByProvinceId(props.province)
				.then((list) => {
					return list.map((item) => {
						return {
							label: item.name,
							value: item.id_place,
							lat: item.latitude,
							lon: item.longitude
						};
					});
				})
				.then((newList) => {
					setPoints(newList);
				});
		};
		if (props.province !== '') {
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
								<Form.Label className={styles.title}>End point</Form.Label>
								<Select
									className={`${styles.customSelect} ${
										validated && (endPoint?.type === "" || Object.keys(endPoint).length === 0) && styles.invalid
									} ${
										validated && Object.keys(endPoint).length > 0 && endPoint.type !== "" && styles.valid
									}`}
									classNamePrefix="select"
									defaultValue={props?.endPoint?.value}
									placeholder="-- Select point type --"
									onChange={(event) => {
										props.setEndPoint({
											type: event.value,
											lat: '',
											lon: '',
											name: ''
										});
									}}
									isDisabled={isDisabled}
									options={optionEndPoint}
									required
								>
								</Select>
								{validated && (endPoint?.type === "" || Object.keys(endPoint).length === 0) && (
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
				{props.endPoint.type === 'Hut/Parking lot' && (
					<Col>
						<Form.Group>
							<Form.Label className={styles.title}>Select a point</Form.Label>
							<Select
								className={`${styles.customSelect} ${
									validated && (
										endPoint?.type === ""
										|| Object.keys(endPoint).length === 0
										|| (endPoint.type === "Hut/Parking lot" && (endPoint.lat === "" || endPoint.lng === ""))
									) && styles.invalid
								} ${
									validated && Object.keys(endPoint).length > 0 
									&& endPoint.type === "Hut/Parking lot" && (endPoint.lat !== "" || endPoint.lng !== "") && styles.valid
								}`}
								classNamePrefix="select"
								placeholder="Select a point"
								defaultValue={props.endPoint.id}
								name="endPoint"
								isSearchable={true}
								isDisabled={isDisabled}
								options={points}
								onChange={(event) => {
									props.setEndPoint({
										type: props.endPoint.type,
										id: event.value,
										name: event.label,
										lon: event.lon,
										lat: event.lat
									});
								}}
							/>
							{validated && (
								endPoint?.type === ""
								|| Object.keys(endPoint).length === 0
								|| (endPoint.type === "Hut/Parking lot" && (endPoint.lat === "" || endPoint.lng === ""))
							) && (
								<div className={styles.feedbackContainer}>
									<span className={styles.feedback}>
										Please select a valid point
									</span>
								</div>
							)}
						</Form.Group>
					</Col>
				)}
				{props.endPoint.type === 'Address/Name of location' && (
					<Col>
						<Form.Group>
							<Form.Label className={styles.title}>
								Address/Name of location
							</Form.Label>
							<MapSearch point={props.endPoint} setPoint={props.setEndPoint} />
						</Form.Group>
					</Col>
				)}
				{props.endPoint.type === 'GPS coordinates' && (
					<>
						<Col>
							<Form.Group>
								<Form.Label className={styles.title}>Longitude</Form.Label>
								<Form.Control
									type="number"
									value={props.endPoint.lon}
									placeholder="Longitude"
									onChange={(event) => {
										props.setEndPoint({
											type: props.endPoint.type,
											id: props.endPoint.id,
											name: props.endPoint.name,
											lon: event.target.value,
											lat: props.endPoint.lat
										});
									}}
									required={props.endPoint.type === 'GPS coordinates'}
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
									value={props.endPoint.lat}
									placeholder="Latitude"
									onChange={(event) => {
										props.setEndPoint({
											type: props.endPoint.type,
											id: props.endPoint.id,
											name: props.endPoint.name,
											lat: event.target.value,
											lon: props.endPoint.lon
										});
									}}
									required={props.endPoint.type === 'GPS coordinates'}
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
