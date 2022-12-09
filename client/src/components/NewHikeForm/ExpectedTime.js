import { Form } from 'react-bootstrap';
import styles from './index.module.scss';

export default function ExpectedTime(props) {
	return (
		<Form.Group>
			<Form.Label className={styles.title}>Expected time</Form.Label>
			<Form.Control
				className={styles.customInsert}
				type="text"
				value={props.expectedTime}
				onChange={(event) => props.setExpectedTime(event.target.value)}
				placeholder="Expected time"
				required={true}
				pattern="(([1-9]|1[0-9]|2[0-3])h(\s)?)?(([1-9]|[1-5][0-9])m)?"

			/>
			<Form.Text>Maximum values:23h 59m (with space).</Form.Text>
			<Form.Control.Feedback type="invalid">
				Wrong format.
			</Form.Control.Feedback>
		</Form.Group>
	);
}
