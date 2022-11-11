import { Form, Col } from 'react-bootstrap';

export default function ExpectedTime(props) {
	return (
		<Form.Group as={Col} md="4">
			<Form.Label>Expected time</Form.Label>
			<Form.Control
				type="text"
				value={props.expectedTime}
				onChange={(event) => props.setExpectedTime(event.target.value)}
				placeholder="0d 0h 0m"
			/>
			<Form.Text>
				Expected time on the format: days d hours h minutes m.
			</Form.Text>
		</Form.Group>
	);
}
