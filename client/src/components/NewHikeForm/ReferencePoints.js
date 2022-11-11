import { Row, Col, Form, Button, Collapse, Container } from 'react-bootstrap';
import { useState } from 'react';

export default function ReferencePoints(props) {
	const [open, setOpen] = useState(false);
	return (
		<>
			{/*Reference points field*/}
			<Col md={3}>
				<Button
					className="my-3"
					onClick={() => setOpen(!open)}
					aria-controls="reference-points"
					aria-expanded={open}
				>
					Add Reference points
				</Button>
			</Col>
			<Collapse in={open}>
				<Container id="reference-points">
					<Row className="mb-3">
						<Form.Group>
							<Form.Label>Upload a gpx file</Form.Label>
							<Form.Control
								type="file"
								value={props.gpxFile}
								onChange={(event) => props.setGpxFile(event.target.value)}
							/>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Form.Group>
							<Form.Label>Select a reference point</Form.Label>
							<Form.Select
								value={props.refPoint}
								onChange={(event) => {
									props.setRefPoint(event.target.value);
									console.log(props.refPoint);
								}}
							>
								<option></option>
								<option key={0} value="RefPoint 2">
									RefPoint 2
								</option>
								<option key={1} value="RefPoint 3">
									RefPoint 3
								</option>
							</Form.Select>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Col md={3}>
							<Button onClick={props.addRefPoint}>Add</Button>
						</Col>
					</Row>
					<Row className="mb-3"></Row>
				</Container>
			</Collapse>
		</>
	);
}
