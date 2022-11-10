import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function NewHikeForm(props) {
	const [title, setTitle] = useState();
	const [length, setLength] = useState();
	const [expectedTime, setExpectedTime] = useState();
	const [ascent, setAscent] = useState();
	const [difficulty, setDifficulty] = useState();
	const [startPoint, setStartPoint] = useState();
	const [endPoint, setEndPoint] = useState();
	const [referencePoints, setReferencePoints] = useState();
	const [description, setDescription] = useState();

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<Form className="text-start" onSubmit={handleSubmit}>
			<Row className="mb-3">
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type="text"
						placeholder="Hike name"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group as={Col} md="4">
					<Form.Label>Length</Form.Label>
					<Form.Control
						type="number"
						value={length}
						onChange={(event) => setLength(event.target.value)}
					/>
					<Form.Text className="text-muted">
						Length of the hike in KM.
					</Form.Text>
				</Form.Group>

				<Form.Group as={Col} md="4">
					<Form.Label>Expected time</Form.Label>
					<Form.Control
						type="text"
						value={expectedTime}
						onChange={(event) => setExpectedTime(event.target.value)}
						placeholder="0d 0h 0m"
					/>
					<Form.Text>
						Expected time on the format: days d hours h minutes m
					</Form.Text>
				</Form.Group>

				<Form.Group as={Col} md="4">
					<Form.Label>Ascent</Form.Label>
					<Form.Control
						type="number"
						value={ascent}
						onChange={(event) => setAscent(event.target.value)}
					/>
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group>
					<Row>
						<Col>
							<Form.Label>Difficulty</Form.Label>
						</Col>
						<Col>
							<Form.Check
								inline
								type="radio"
								label="Easy"
								name="Difficuilty"
								id="Easy"
								value="Easy"
								onChange={(event) => setDifficulty(event.target.value)}
							/>
						</Col>
						<Col>
							<Form.Check
								inline
								type="radio"
								label="Medium"
								name="Difficuilty"
								id="Medium"
								value="Medium"
								onChange={(event) => setDifficulty(event.target.value)}
							/>
						</Col>
						<Col>
							<Form.Check
								inline
								type="radio"
								label="Hard"
								name="Difficuilty"
								id="Hard"
								value="Hard"
								onChange={(event) => setDifficulty(event.target.value)}
							/>
						</Col>
					</Row>
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group>
					<Form.Label>Reference points</Form.Label>
					<Form.Control
						type="file"
						value={referencePoints}
						onChange={(event) => setReferencePoints(event.target.value)}
					/>
				</Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group as={Col} md="6">
					<Form.Label>Start point</Form.Label>
					<Form.Select
						value={startPoint}
						onChange={(event) => setStartPoint(event.target.value)}
					>
						<option key={0} value="StartPoint 1">
							StartPoint 1
						</option>
						<option key={1} value="StartPoint 2">
							StartPoint 2
						</option>
					</Form.Select>
				</Form.Group>
				<Form.Group as={Col} md="6">
					<Form.Label>End point</Form.Label>
					<Form.Select
						value={endPoint}
						onChange={(event) => setEndPoint(event.target.value)}
					>
						<option key={0} value="EndPoint 1">
							EndPoint 1
						</option>
						<option key={1} value="EndPoint 2">
							EndPoint 2
						</option>
					</Form.Select>
				</Form.Group>
			</Row>

			<Row clasName="mb-3">
				<Form.Group as={Row} md="3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea"
						rows={5}
						value={description}
						onChange={(event) => setDescription(event.target.value)}
					/>
				</Form.Group>
			</Row>
			<Row className="my-5">
				<Col className="col-md-3">
					<Button type="submit">Login</Button>
				</Col>
			</Row>
		</Form>
	);
}
