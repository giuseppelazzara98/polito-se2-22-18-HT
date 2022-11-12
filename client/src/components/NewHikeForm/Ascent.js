import { Form, Col } from 'react-bootstrap';

export default function Ascent(props) {
	return (
		<Form.Group as={Col} md="4">
			<Form.Label>Ascent</Form.Label>
			<Form.Control
				type="number"
				value={props.ascent}
				onChange={(event) => props.setAscent(event.target.value)}
				placeholder="0"
				required={true}
				min={0}
				max={8849}
			/>
			<Form.Text>Ascent in Meters.</Form.Text>
		</Form.Group>
	);
}
