import { Form, Col, Row, FloatingLabel } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';
import MapSearch from './MapSearch';

export default function EndPoint(props) {
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
								<Form.Label className={styles.title}>End point</Form.Label>
								<Form.Select
									className={styles.customSelect}
									aria-label="End point type"
									value={
										props.endPoint.type === '' ? undefined : props.endPoint.type
									}
									onChange={(event) => {
										props.setEndPoint({
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
				{props.endPoint.type === 'Hut/Parking lot' && (
					<Col>
						<Form.Group>
							<Form.Label className={styles.title}>Select a point</Form.Label>
							<Select
								className={styles.customSelect}
								classNamePrefix="select"
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
