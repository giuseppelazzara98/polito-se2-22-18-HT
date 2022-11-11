import { Form, Col } from 'react-bootstrap';

export default function Province(props) {
	const generateOptions = () => {
		/* An api should be called here to retuen provinces as options*/
		return (
			<>
				<option key={1} value="Province 1">
					Province 1
				</option>
				<option key={2} value="Province 2">
					Province 2
				</option>
			</>
		);
	};
	return (
		<Form.Group as={Col} md="6">
			<Form.Label>Province</Form.Label>
			<Form.Select
				value={props.province}
				onChange={(event) => props.setProvince(event.target.value)}
			>
				{/* Instead of manual options here, API call to db to get list of provinces */}
				<option key={0}>Select Province</option>
				{generateOptions()}
			</Form.Select>
		</Form.Group>
	);
}
