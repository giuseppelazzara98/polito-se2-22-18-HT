import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
import API from '../../API/api';
import styles from './index.module.scss';


export default function NewHikeForm(props) {
	const {setUpdateHikes} = props;
	const [title, setTitle] = useState('');
	const [province, setProvince] = useState('');
	const [length, setLength] = useState('');
	const [expectedTime, setExpectedTime] = useState('');
	const [ascent, setAscent] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [startPoint, setStartPoint] = useState(0);
	const [endPoint, setEndPoint] = useState(0);
	const [referencePoints, setReferencePoints] = useState([]);
	const [gpxFile, setGpxFile] = useState('');
	const [description, setDescription] = useState('');
	const [refPoint, setRefPoint] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const hike = {
			title: title,
			province: province,
			length: length,
			expectedTimeString: expectedTime,
			expectedTime: 0,
			ascent: ascent ,
			difficulty: difficulty,
			startPoint: startPoint,
			endPoint: endPoint,
			referencePoints: [],
			gpxFile: gpxFile,
			description: description
		};

		const time = hike.expectedTimeString.split(' ');
		let hours = 0;
		time.forEach((part) => {
			if (part[part.length - 1] === 'm') {
				const p = part.slice(0, part.length - 1);
				const m = parseInt(p, 10);
				hours += m * 730.5;
			} else if (part[part.length - 1] === 'w') {
				const p = part.slice(0, part.length - 1);
				const w = parseInt(p, 10);
				hours += w * 168;
			} else if (part[part.length - 1] === 'd') {
				const p = part.slice(0, part.length - 1);
				const d = parseInt(p, 10);
				hours += d * 24;
			} else if (part[part.length - 1] === 'h') {
				const p = part.slice(0, part.length - 1);
				const h = parseInt(p, 10);
				hours += h;
			}
		});
		hike.expectedTime = hours;
		hike.referencePoints = referencePoints.map((point) => {
			return point.id_place;
		});
		hike.difficulty = parseInt(difficulty, 10);
		hike.ascent = parseInt(ascent, 10);
		hike.ascent = ascent * 100;
		hike.length = parseInt(length, 10);
		const addNewHike = async () => {
			await API.createNewHike(hike);
		};
		addNewHike();
		setUpdateHikes(prevstate => prevstate + 1);
		navigate('/');
	};

	const addRefPoint = () => {
		if (
			referencePoints.find((point) => point.id_place === refPoint) === undefined
		) {
			API.getPlaceById(refPoint)
				.then((place) => {
					const list = [...referencePoints, place];
					//console.log(place);
					return list;
				})
				.then((list) => setReferencePoints(list));
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
				<Col className="col-md-3 mb-4">
					<Button className={styles.button} type="submit">Submit</Button>
				</Col>
			</Row>
		</Form>
	);
}
