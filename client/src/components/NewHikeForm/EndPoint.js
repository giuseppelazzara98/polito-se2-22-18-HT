import { Form, Col } from 'react-bootstrap';

export default function EndPoint(props) {
	return (
		<Form.Group as={Col} md="6">
			<Form.Label>End point</Form.Label>
			<Form.Select
				value={props.endPoint}
				onChange={(event) => props.setEndPoint(event.target.value)}
			>
				{/* Instead of manual options here, API call to db to get list of points */}
				<option key={0} value="EndPoint 1">
					EndPoint 1
				</option>
				<option key={1} value="EndPoint 2">
					EndPoint 2
				</option>
			</Form.Select>
		</Form.Group>
	);
}
