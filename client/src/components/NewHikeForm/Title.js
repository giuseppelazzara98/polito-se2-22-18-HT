import { Form, Col } from 'react-bootstrap';
export default function Title(props) {
	return (
		<Form.Group as={Col} md={6}>
			<Form.Label>Title</Form.Label>
			<Form.Control
				type="text"
				placeholder="Hike name"
				value={props.title}
				onChange={(event) => props.setTitle(event.target.value)}
				required
			/>
		</Form.Group>
	);
}
