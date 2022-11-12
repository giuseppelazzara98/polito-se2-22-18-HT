import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import ReferencePoints from './ReferencePoints';
import DifficultyLevel from './DifficultyLevel';
import EndPoint from './EndPoint';
import Title from './Title';
import Province from './Province';
import Length from './Length';
import ExpectedTime from './ExpectedTime';
import Ascent from './Ascent';
import StartPoint from './StartPoint';
import Description from './Description';

export default function NewHikeForm(props) {
	const [title, setTitle] = useState('');
	const [province, setProvince] = useState(1);
	const [length, setLength] = useState('');
	const [expectedTime, setExpectedTime] = useState('');
	const [ascent, setAscent] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [startPoint, setStartPoint] = useState('');
	const [endPoint, setEndPoint] = useState('');
	const [referencePoints, setReferencePoints] = useState([]);
	const [gpxFile, setGpxFile] = useState('');
	const [description, setDescription] = useState('');
	const [refPoint, setRefPoint] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		const hike = {
			title: title,
			province: province,
			length: length,
			expectedTime: expectedTime,
			ascent: ascent,
			difficulty: difficulty,
			startPoint: startPoint,
			endPoint: endPoint,
			referencePoints: referencePoints,
			gpxFile: gpxFile,
			description: description,
			refPoint: refPoint //remove later when done testing
		};

		console.log(hike);
	};

	const addRefPoint = () => {
		if (referencePoints.find((point) => point === refPoint) === undefined) {
			const list = [...referencePoints, refPoint];
			setReferencePoints(list);
		}
	};

	const delRefPoint = (point) => {
		const list = referencePoints.filter((element) => element !== point);
		setReferencePoints(list);
	};

	return (
		<Form className="text-start" onSubmit={handleSubmit}>
			<Row className="mb-3">
				{/*Title field*/}
				<Title title={title} setTitle={setTitle} />
				{/*Province field*/}
				<Province province={province} setProvince={setProvince} />
			</Row>

			<Row className="mb-3">
				{/*Length field*/}
				<Length length={length} setLength={setLength} />
				{/*Expected time field*/}
				<ExpectedTime
					expectedTime={expectedTime}
					setExpectedTime={setExpectedTime}
				/>
				{/*Ascent field*/}
				<Ascent ascent={ascent} setAscent={setAscent} />
			</Row>

			{/*Third row contains difficulty level*/}
			<Row className="mb-3">
				<DifficultyLevel setDifficulty={setDifficulty} />
			</Row>

			{/*Fourth row contains the start and end points*/}
			<Row className="mb-3">
				{/*Start point field*/}
				<StartPoint
					startPoint={startPoint}
					setStartPoint={setStartPoint}
					province={province}
				/>
				{/*End point field*/}
				<EndPoint
					endPoint={endPoint}
					setEndPoint={setEndPoint}
					province={province}
				/>
			</Row>

			{/*Fifth row contains Reference points*/}
			<Row className="mb-3">
				<ReferencePoints
					gpxFile={gpxFile}
					setGpxFile={setGpxFile}
					referencePoints={referencePoints}
					setReferencePoints={setReferencePoints}
					refPoint={refPoint}
					setRefPoint={setRefPoint}
					addRefPoint={addRefPoint}
					delRefPoint={delRefPoint}
					province={province}
				/>
			</Row>

			{/*Final row with the description field*/}
			<Row className="mb-3">
				{/*Description field*/}
				<Description
					description={description}
					setDescription={setDescription}
				/>
			</Row>

			{/*Submit button*/}
			<Row className="my-5">
				<Col className="col-md-3">
					<Button type="submit">Submit</Button>
				</Col>
			</Row>
		</Form>
	);
}
