import { Row, Col, Form, Button, Collapse, Container } from 'react-bootstrap';
import { useState } from 'react';
import PointsTable from './PointsTable';

export default function ReferencePoints(props) {
	const [open, setOpen] = useState(false);
	const generateOptions = () => {
		/* An API should be called here to get the points and the function return them */
		return (
			<>
				<option key={1} value="Point 1">
					Point 1
				</option>
				<option key={2} value="Point 2">
					Point 2
				</option>
				<option key={3} value="Point 3">
					Point 3
				</option>
				<option key={4} value="Point 4">
					Point 4
				</option>
			</>
		);
	};
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
								}}
							>
								<option key={0}>Select point</option>
								{generateOptions()}
							</Form.Select>
						</Form.Group>
					</Row>
					<Row className="mb-3">
						<Col md={3}>
							<Button onClick={props.addRefPoint}>Add</Button>
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
