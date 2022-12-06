import { Form } from 'react-bootstrap';
import styles from './index.module.scss';

export default function Insert(props) {
	const {
		min = null,
		max = null,
		minLength = null,
		maxLength = null,
		required = true,
		as,
		text = "",
		placeholder,
		setParam,
		param,
		pattern = null,
	} = props;
	return (
		<Form.Group>
			<Form.Label className={styles.title}>{props.title}</Form.Label>
			<Form.Control
				className={styles.customInsert}
				type={props.type}
				placeholder={placeholder}
				//value={props.title}
				onChange={(event) => setParam(event.target.value)}
				as={as}
				rows={5}
				required={required}
				value={param}
				minLength={minLength}
				maxLength={maxLength}
				min={min}
				max={max}
				pattern={pattern}
			/>
			<Form.Text>{text}</Form.Text>
			<Form.Control.Feedback type="invalid">
				{props.invalid}
			</Form.Control.Feedback>

		</Form.Group>
	);
}
