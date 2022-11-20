import {
	Row,
	Col,
	Form,
	Button,
	Collapse,
	Container,
	FloatingLabel
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PointsTable from './PointsTable';
import Select from 'react-select';
import API from '../../API/api';
import styles from './index.module.scss';

export default function ReferencePoints(props) {
	const [open, setOpen] = useState(false);
	const [points, setPoints] = useState([]);

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
									<Form.Select
										className={styles.customSelect}
										aria-label="reference point type"
										value={
											props.refPoint.type === ''
												? undefined
												: props.refPoint.type
										}
										onChange={(event) => {
											props.setRefPoint({
												id: '',
												type: event.target.value,
												lat: '',
												lng: '',
												name: ''
											});
										}}
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
													lng: event.lng,
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
										<Form.Control
											type="text"
											value={props.refPoint.name}
											placeholder="Address/Name of location"
											onChange={(event) => {
												props.setRefPoint({
													type: props.refPoint.type,
													id: props.refPoint.id,
													name: event.target.value,
													lng: props.refPoint.lng,
													lat: props.refPoint.lat
												});
											}}
											required={
												props.refPoint.type === 'Address/Name of location'
											}
										/>
										<Form.Control.Feedback type="invalid">
											Please insert a valid address/place name
										</Form.Control.Feedback>
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
												value={props.refPoint.lng}
												placeholder="Longitude"
												onChange={(event) => {
													props.setRefPoint({
														type: props.refPoint.type,
														id: props.refPoint.id,
														name: props.refPoint.name,
														lng: event.target.value,
														lat: props.refPoint.lat
													});
												}}
												required={props.refPoint.type === 'GPS coordinates'}
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
														id: props.refPoint.id,
														name: props.refPoint.name,
														lat: event.target.value,
														lng: props.refPoint.lng
													});
												}}
												required={props.refPoint.type === 'GPS coordinates'}
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
