import { Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';
import MapSearch from './MapSearch';

export default function StartPoint(props) {
	const [points, setPoints] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);

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
								<Form.Label className={styles.title}>Start point</Form.Label>
								<Form.Select
									className={styles.customSelect}
									aria-label="Start point type"
									value={
										props.startPoint.type === ''
											? undefined
											: props.startPoint.type
									}
									onChange={(event) => {
										props.setStartPoint({
											type: event.target.value,
											lat: '',
											lon: '',
											name: ''
										});
									}}
									disabled={isDisabled}
									required
								>
									<option value="">-- Select point type --</option>
									<option value="Hut/Parking lot">Hut/Parking lot</option>
									<option value="Address/Name of location">
										Address/Name of location
									</option>
									<option value="GPS coordinates">GPS coordinates</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									Please select a valid type
								</Form.Control.Feedback>
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
								className={styles.customSelect}
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
										lon: event.lon,
										lat: event.lat
									});
								}}
							/>
						</Form.Group>
					</Col>
				)}
				{props.startPoint.type === 'Address/Name of location' && (
					<Col>
						<Form.Group>
							<Form.Label className={styles.title}>
								Address/Name of location
							</Form.Label>
							<MapSearch
								point={props.startPoint}
								setPoint={props.setStartPoint}
							/>
						</Form.Group>
					</Col>
				)}
				{props.startPoint.type === 'GPS coordinates' && (
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
											id: props.startPoint.id,
											name: props.startPoint.name,
											lon: event.target.value,
											lat: props.startPoint.lat
										});
									}}
									required={props.startPoint.type === 'GPS coordinates'}
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
											id: props.startPoint.id,
											name: props.startPoint.name,
											lat: event.target.value,
											lon: props.startPoint.lon
										});
									}}
									required={props.startPoint.type === 'GPS coordinates'}
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
