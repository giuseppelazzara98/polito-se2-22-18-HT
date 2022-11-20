import { Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';

export default function StartPoint(props) {
	const {
		validated,
		startPoint
	} = props;
	const [points, setPoints] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);

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
							lng: item.longitude
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
								<Form.Label className={styles.title}>Start point</Form.Label>
								<Select
									className={`${styles.customSelect} ${
										validated && (startPoint?.type === "" || Object.keys(startPoint).length === 0) && styles.invalid
									} ${
										validated && Object.keys(startPoint).length > 0 && startPoint.type !== "" && styles.valid
									}`}
									classNamePrefix="select"
									defaultValue={props?.startPoint?.value}
									placeholder="-- Select point type --"
									onChange={(event) => {
										props.setStartPoint({
											type: event.value,
											lat: '',
											lng: '',
											name: ''
										});
									}}
									isDisabled={isDisabled}
									options={optionStartPoint}
									required
								>
								</Select>
								{validated && (startPoint?.type === "" || Object.keys(startPoint).length === 0) && (
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
				{props.startPoint.type === 'Hut/Parking lot' && (
					<Col>
						<Form.Group>
							<Form.Label className={styles.title}>Select a point</Form.Label>
							<Select
								className={`${styles.customSelect} ${
									validated && (
										startPoint?.type === ""
										|| Object.keys(startPoint).length === 0
										|| (startPoint.type === "Hut/Parking lot" && (startPoint.lat === "" || startPoint.lng === ""))
									) && styles.invalid
								} ${
									validated && Object.keys(startPoint).length > 0 
									&& startPoint.type === "Hut/Parking lot" && (startPoint.lat !== "" || startPoint.lng !== "") && styles.valid
								}`}
								placeholder="Select a point"
								classNamePrefix="select"
								defaultValue={props.startPoint.id}
								name="startPoint"
								isSearchable={true}
								isDisabled={isDisabled}
								options={points}
								onChange={(event) => {
									props.setStartPoint({
										type: props.startPoint.type,
										id: event.value,
										name: event.label,
										lng: event.lng,
										lat: event.lat
									});
								}}
							/>
							{validated && (
								startPoint?.type === ""
								|| Object.keys(startPoint).length === 0
								|| (startPoint.type === "Hut/Parking lot" && (startPoint.lat === "" || startPoint.lng === ""))
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
				{props.startPoint.type === 'Address/Name of location' && (
					<Col>
						<Form.Group>
							<FloatingLabel
								className={styles.title}
								controlId="address-placeName"
								label="Address/Name of location"
							>
								<Form.Control
									type="text"
									value={props.startPoint.name}
									placeholder="Address/Name of location"
									onChange={(event) => {
										props.setStartPoint({
											type: props.startPoint.type,
											id: props.startPoint.id,
											name: event.target.value,
											lng: props.startPoint.lng,
											lat: props.startPoint.lat
										});
									}}
									required={
										props.startPoint.type === 'Address/Name of location'
									}
								/>
								<Form.Control.Feedback type="invalid">
									Please insert a valid address/place name
								</Form.Control.Feedback>
							</FloatingLabel>
						</Form.Group>
					</Col>
				)}
				{props.startPoint.type === 'GPS coordinates' && (
					<>
						<Col>
							<Form.Group>
								<FloatingLabel
									className={styles.title}
									controlId="Longitude"
									label="Longitude"
								>
									<Form.Control
										type="number"
										value={props.startPoint.lng}
										placeholder="Longitude"
										onChange={(event) => {
											props.setStartPoint({
												type: props.startPoint.type,
												id: props.startPoint.id,
												name: props.startPoint.name,
												lng: event.target.value,
												lat: props.startPoint.lat
											});
										}}
										required={props.startPoint.type === 'GPS coordinates'}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert a valid Longitude
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group>
								<FloatingLabel
									controlId="Latitude"
									className={styles.title}
									label="Latitude"
								>
									<Form.Control
										type="number"
										value={props.startPoint.lat}
										placeholder="Latitude"
										onChange={(event) => {
											props.setStartPoint({
												type: props.startPoint.type,
												id: props.startPoint.id,
												name: props.startPoint.name,
												lat: event.target.value,
												lng: props.startPoint.lng
											});
										}}
										required={props.startPoint.type === 'GPS coordinates'}
									/>
									<Form.Control.Feedback type="invalid">
										Please insert a valid Latitude
									</Form.Control.Feedback>
								</FloatingLabel>
							</Form.Group>
						</Col>
					</>
				)}
			</Row>
		</>
	);
}
