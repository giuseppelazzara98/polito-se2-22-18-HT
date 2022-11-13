import { Col, Row, Form } from 'react-bootstrap';
import styles from "./index.module.scss";


export default function DifficultyLevel(props) {
	return (
		<Form.Group>
			<Row>
				<Col>
					<Form.Label className={styles.title}>Difficulty</Form.Label>
				</Col>
				<Col>
					<Form.Check
						className={styles.check}
						inline
						type="radio"
						label="Turist"
						name="Difficuilty"
						id="Turist"
						value={1}
						onChange={(event) => props.setDifficulty(event.target.value)}
						required={true}
					/>
				</Col>
				<Col>
					<Form.Check
						className={styles.check}
						inline
						type="radio"
						label="Hiker"
						name="Difficuilty"
						id="Hiker"
						value={2}
						onChange={(event) => props.setDifficulty(event.target.value)}
						required={true}
					/>
				</Col>
				<Col>
					<Form.Check
						className={styles.check}
						inline
						type="radio"
						label="Professional Hiker"
						name="Difficuilty"
						id="Professional Hiker"
						value={3}
						onChange={(event) => props.setDifficulty(event.target.value)}
						required={true}
					/>
				</Col>
			</Row>
		</Form.Group>
	);
}
