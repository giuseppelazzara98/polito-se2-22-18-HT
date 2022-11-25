import { Row, Col, Form, Button, Collapse, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PointsTable from './PointsTable';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';
import MapSearch from './MapSearch';

export default function ReferencePoints(props) {
	const [open, setOpen] = useState(false);
	const [points, setPoints] = useState([]);
	const max = 50000;
	const min = 1000;

	const pointTypeOptions = [
		{ label: '-- Select point type --', value: '' },
		{ label: 'Hut/Parking lot', value: 'Hut/Parking lot' },
		{ label: 'Address/Name of location', value: 'Address/Name of location' },
		{ label: 'GPS coordinates', value: 'GPS coordinates' }
	];

	useEffect(() => {
		const loadPoints = () => {
			API.getPointsByProvinceId(props.province)
				.then((list) => {
					return list.map((item) => {
						return {
							label: item.name,
							value: item.id_place
						};
					});
				})
				.then((newList) => {
					setPoints(newList);
				});
		};
		if (props.province !== '') {
			loadPoints();
		}
	}, [props.province]);

	return (
		<>
			<Row className="mb-3">
				{/*Reference points field*/}
				<Col md={3}>
					{!open && (
						<Button
							onClick={() => setOpen(!open)}
							aria-controls="reference-points"
							aria-expanded={open}
							className={styles.button}
						>
							Add Reference points
						</Button>
					)}
				</Col>
			</Row>
			<Row className="mb-3">
				<Collapse in={open}>
					<Container id="reference-points">
						<Row className="mb-3">
							<Col>
								<Form.Group>
									<Form.Label className={styles.title}>
										Select refernce point type
									</Form.Label>
									<Select
										className={styles.customSelect}
										classNamePrefix="select"
										defaultValue={
											props.refPoint.type === ''
												? undefined
												: props.refPoint.type
										}
										name="reference point type"
										options={pointTypeOptions}
										onChange={(event) => {
											props.setRefPoint({
												id: '',
												type: event.value,
												lat: '',
												lon: '',
												name: ''
											});
										}}
									/>
								</Form.Group>
							</Col>
							{props.refPoint.type === 'Hut/Parking lot' && (
								<Col>
									<Form.Group>
										<Form.Label className={styles.title}>
											Select a point
										</Form.Label>
										<Select
											className={styles.customSelect}
											classNamePrefix="select"
											defaultValue={props.refPoint.id}
											name="refPoint"
											isSearchable={true}
											options={points}
											onChange={(event) => {
												props.setRefPoint({
													type: props.refPoint.type,
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
							{props.refPoint.type === 'Address/Name of location' && (
								<Col>
									<Form.Group>
										<Form.Label className={styles.title}>
											Address/Name of location
										</Form.Label>
										<MapSearch
											point={props.refPoint}
											setPoint={props.setRefPoint}
										/>
									</Form.Group>
								</Col>
							)}
							{props.refPoint.type === 'GPS coordinates' && (
								<>
									<Col>
										<Form.Group>
											<Form.Label className={styles.title}>
												Longitude
											</Form.Label>
											<Form.Control
												type="number"
												value={props.refPoint.lon}
												placeholder="Longitude"
												onChange={(event) => {
													props.setRefPoint({
														type: props.refPoint.type,
														id:
															props.refPoint.id === undefined ||
															props.refPoint.id === ''
																? Math.floor(Math.random() * (max - min) + min)
																: props.refPoint.id,
														name: props.refPoint.name,
														lon: event.target.value,
														lat: props.refPoint.lat
													});
												}}
												required={props.refPoint.type === 'GPS coordinates'}
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
												value={props.refPoint.lat}
												placeholder="Latitude"
												onChange={(event) => {
													props.setRefPoint({
														type: props.refPoint.type,
														id:
															props.refPoint.id === undefined ||
															props.refPoint.id === ''
																? Math.floor(Math.random() * (max - min) + min)
																: props.refPoint.id,
														name: props.refPoint.name,
														lat: event.target.value,
														lon: props.refPoint.lon
													});
												}}
												required={props.refPoint.type === 'GPS coordinates'}
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
						<Row className="mb-3">
							<Col md={3}>
								<Button className={styles.button} onClick={props.addRefPoint}>
									Add reference point
								</Button>
							</Col>
						</Row>
						<Row className="mb-3">
							<PointsTable
								referencePoints={props.referencePoints}
								delRefPoint={props.delRefPoint}
							/>
						</Row>
					</Container>
				</Collapse>
			</Row>
		</>
	);
}
