import { Form, Col } from 'react-bootstrap';

export default function Province(props) {
	return (
		<Form.Group as={Col} md="6">
			<Form.Label>Province</Form.Label>
			<Form.Select
				value={props.province}
				onChange={(event) => props.setProvince(event.target.value)}
			>
				{/* Instead of manual options here, API call to db to get list of provinces */}
				<option key={0} value="Province 1">
					Province 1
				</option>
				<option key={1} value="Province 2">
					Province 2
				</option>
			</Form.Select>
		</Form.Group>
	);
}
