import { Row, Col, Form } from 'react-bootstrap';
import styles from './index.module.scss';
import gpxParser from 'gpxparser';

export default function GPXFile(props) {
	const readFile = (event) => {
		const reader = new FileReader();
		reader.onload = async () => {
			const content = reader.result;
			var gpx = new gpxParser();
			gpx.parse(content);
			let gpxPoints = gpx?.tracks?.[0]?.points || [];
			props.setGpxPoints(gpxPoints);
			const length = gpx.tracks[0].distance.total / 1000;
			props.setLength(length.toFixed(3));
			const positiveElevationDiff = gpx.tracks[0].elevation.pos;
			props.setAscent(positiveElevationDiff.toFixed(2));
		};
		if (typeof event.target.files[0] !== 'undefined') {
			reader.readAsText(event.target.files[0]);
		}
	};
	return (
		<>
			<Row className="mb-3">
				<Col>
					<Form.Group>
						<Form.Label className={styles.title}>
							Upload the hike track
						</Form.Label>
						<Form.Control
							type="file"
							value={props.gpxFile}
							onChange={(event) => {
								props.setGpxFile(event.target.value);
								readFile(event);
							}}
							required={true}
							accept=".gpx"
						/>
						<Form.Text>The track should be in a .gpx file</Form.Text>
						<Form.Control.Feedback type="invalid">
							Please select a gpx file for the track
						</Form.Control.Feedback>
					</Form.Group>
				</Col>
			</Row>
		</>
	);
}
