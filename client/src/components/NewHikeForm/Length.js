import { Form, Col } from 'react-bootstrap';
import styles from './index.module.scss';

export default function Length(props) {
	return (
		<Form.Group>
			<Form.Label className={styles.title}>Length</Form.Label>
			<Form.Control
				className={styles.customInsert}
				type="number"
				value={props.length}
				onChange={(event) => props.setLength(event.target.value)}
				required={true}
				placeholder="0"
				min={0}
				max={40075}
			/>
			<Form.Control.Feedback type="invalid">
				Length can't be empty and must be in range 0 to 40075
			</Form.Control.Feedback>
			<Form.Text className="text-muted">Length of the hike in KM.</Form.Text>
		</Form.Group>
	);
}
