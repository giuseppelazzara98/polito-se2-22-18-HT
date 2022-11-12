import { Col, Row, Form } from 'react-bootstrap';

export default function DifficultyLevel(props) {
	return (
		<Form.Group>
			<Row>
				<Col>
					<Form.Label>Difficulty</Form.Label>
				</Col>
				<Col>
					<Form.Check
						inline
						type="radio"
						label="Turist"
						name="Difficuilty"
						id="Turist"
						value="Turist"
						onChange={(event) => props.setDifficulty(event.target.value)}
						required={true}
					/>
				</Col>
				<Col>
					<Form.Check
						inline
						type="radio"
						label="Hiker"
						name="Difficuilty"
						id="Hiker"
						value="Hiker"
						onChange={(event) => props.setDifficulty(event.target.value)}
						required={true}
					/>
				</Col>
				<Col>
					<Form.Check
						inline
						type="radio"
						label="Professional Hiker"
						name="Difficuilty"
						id="Professional Hiker"
						value="Professional Hiker"
						onChange={(event) => props.setDifficulty(event.target.value)}
						required={true}
					/>
				</Col>
			</Row>
		</Form.Group>
	);
}
