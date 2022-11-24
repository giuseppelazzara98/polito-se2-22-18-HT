import { Form, Col } from 'react-bootstrap';
import styles from './index.module.scss';

export default function Ascent(props) {
	return (
		<Form.Group>
			<Form.Label className={styles.title}>Ascent</Form.Label>
			<Form.Control
				className={styles.customInsert}
				type="number"
				value={props.ascent}
				onChange={(event) => props.setAscent(event.target.value)}
				placeholder="0"
				required={true}
				min={0}
				max={8849}
				disabled
			/>
			<Form.Control.Feedback type="invalid">
				Ascent can't be empty and must be in range 0 to 8849.
			</Form.Control.Feedback>

			<Form.Text>Ascent in meters.</Form.Text>
		</Form.Group>
	);
}
