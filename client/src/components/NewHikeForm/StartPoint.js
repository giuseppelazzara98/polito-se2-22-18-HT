import { Form, Col } from 'react-bootstrap';

export default function StartPoint(props) {
	return (
		<Form.Group as={Col} md="6">
			<Form.Label>Start point</Form.Label>
			<Form.Select
				value={props.startPoint}
				onChange={(event) => props.setStartPoint(event.target.value)}
			>
				{/* Instead of manual options here, API call to db to get list of points */}
				<option key={0} value="StartPoint 1">
					StartPoint 1
				</option>
				<option key={1} value="StartPoint 2">
					StartPoint 2
				</option>
			</Form.Select>
		</Form.Group>
	);
}
