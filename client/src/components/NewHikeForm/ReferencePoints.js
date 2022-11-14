import { Row, Col, Form, Button, Collapse, Container } from 'react-bootstrap';
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
					</Button >
				)}
			</Col>
			<Collapse in={open}>
				<Container id="reference-points">
					<Row className="mb-3">
						<Form.Group>
							<Form.Label className={styles.title}>Upload a gpx file</Form.Label>
							<Form.Control
							
								type="file"
								value={props.gpxFile}
								onChange={(event) => props.setGpxFile(event.target.value)}
							/>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group>
							<Form.Label className={styles.title}>Select a reference point</Form.Label>
							<Select
								className={styles.customSelect}
								classNamePrefix="select"
								defaultValue={props.refPoint}
								name="refPoint"
								isSearchable={true}
								options={points}
								onChange={(event) => {
									props.setRefPoint(event.value);
								}}
							/>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Col md={3}>
							<Button className={styles.button} onClick={props.addRefPoint}>Add reference point</Button>
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
		</>
	);
}
