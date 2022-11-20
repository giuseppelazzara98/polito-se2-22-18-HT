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
import GPXFile from './GPXFile';
import Map from './Map';

export default function NewHikeForm(props) {
	const { setUpdateHikes } = props;
	const [title, setTitle] = useState('');
	const [province, setProvince] = useState('');
	const [length, setLength] = useState('');
	const [expectedTime, setExpectedTime] = useState('');
	const [ascent, setAscent] = useState('');
	const [difficulty, setDifficulty] = useState('');
	const [startPoint, setStartPoint] = useState({});
	const [endPoint, setEndPoint] = useState({});
	const [referencePoints, setReferencePoints] = useState([]);
	const [gpxFile, setGpxFile] = useState('');
	const [description, setDescription] = useState('');
	const [refPoint, setRefPoint] = useState({});
	const navigate = useNavigate();
	const [gpxData, setGpxData] = useState({});
	const [redraw, setRedraw] = useState(false);
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const hike = {
			title: title,
			province: province,
			length: length,
			expectedTimeString: expectedTime,
			expectedTime: 0,
			ascent: ascent,
			difficulty: difficulty,
			startPoint: startPoint,
			endPoint: endPoint,
			referencePoints: [],
			gpxFile: gpxFile,
			gpxData: gpxData,
			description: description
		};

		const time = hike.expectedTimeString.split(' ');
		let hours = 0;
		time.forEach((part) => {
			if (part[part.length - 1] === 'h') {
				const p = part.slice(0, part.length - 1);
				const h = parseInt(p, 10);
				hours += h;
			} else if (part[part.length - 1] === 'm') {
				const p = part.slice(0, part.length - 1);
				const m = parseInt(p, 10);
				hours += m / 60;
			}
		});
		hike.expectedTime = hours;
		hike.referencePoints = referencePoints.map((point) => {
			return point.id_place;
		});
		hike.difficulty = parseInt(difficulty, 10);
		hike.ascent = parseInt(ascent, 10);
		hike.length = parseInt(length, 10);
		const addNewHike = async () => {
			await API.createNewHike(hike);
		};

		if (form.checkValidity() === false) {
			event.stopPropagation();
		} else {
			console.log(
				'🚀 ~ file: NewHikeForm.js ~ line 80 ~ handleSubmit ~ hike',
				hike
			);

			//addNewHike();
			//setUpdateHikes((prevstate) => prevstate + 1);
			//navigate('/');
		}
		setValidated(true);
	};

	const addRefPoint = () => {
		if (refPoint.type === 'Hut/Parking lot') {
			if (
				referencePoints.find((point) => point.id === refPoint.id) === undefined
			) {
				API.getPlaceById(refPoint.id)
					.then((place) => {
						const list = [...referencePoints, place];
						return list;
					})
					.then((list) => setReferencePoints(list));
			}
		} else if (refPoint.type === 'Address/Name of location') {
			//! need map search first
		} else if (refPoint.type === 'GPS coordinates') {
			//? just user the corrdinates we get from the user and set a random key and name ?
		}
	};

	const delRefPoint = (pointId) => {
		const list = referencePoints.filter((element) => element.id !== pointId);
		setReferencePoints(list);
	};

	return (
		<Form
			className="text-start"
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
		>
			<Row className="mb-3">
				<Col>
					{/*Title field*/}
					<Title title={title} setTitle={setTitle} />
				</Col>
				<Col>
					{/*Province field*/}
					<Province province={province} setProvince={setProvince} />
				</Col>
			</Row>

			<Row className="mb-3">
				<Col>
					{/*Length field*/}
					<Length length={length} setLength={setLength} />
				</Col>
				<Col>
					{/*Expected time field*/}
					<ExpectedTime
						expectedTime={expectedTime}
						setExpectedTime={setExpectedTime}
					/>
				</Col>
				<Col>
					{/*Ascent field*/}
					<Ascent ascent={ascent} setAscent={setAscent} />
				</Col>
			</Row>

			{/*Third row contains difficulty level*/}
			<Row className="mb-3">
				<Col>
					<DifficultyLevel setDifficulty={setDifficulty} />
				</Col>
			</Row>

			{/*Fourth row contains the start and end points*/}
			<Row className="mb-3">
				<Col>
					{/*Start point field*/}
					<StartPoint
						startPoint={startPoint}
						setStartPoint={setStartPoint}
						province={province}
					/>
				</Col>
				<Col>
					{/*End point field*/}
					<EndPoint
						endPoint={endPoint}
						setEndPoint={setEndPoint}
						province={province}
					/>
				</Col>
			</Row>

			<Row className="mb-3">
				<Col>
					<GPXFile
						gpxFile={gpxFile}
						setGpxFile={setGpxFile}
						setGpxData={setGpxData}
						setRedraw={setRedraw}
						redraw={redraw}
					/>
					{gpxData.tracks !== undefined && (
						<Map gpxData={gpxData} redraw={redraw} />
					)}
				</Col>
			</Row>

			{/*Fifth row contains Reference points*/}
			<Row className="mb-3">
				<Col>
					<ReferencePoints
						referencePoints={referencePoints}
						setReferencePoints={setReferencePoints}
						refPoint={refPoint}
						setRefPoint={setRefPoint}
						addRefPoint={addRefPoint}
						delRefPoint={delRefPoint}
						province={province}
					/>
				</Col>
			</Row>

			{/*Final row with the description field*/}
			<Row className="mb-3">
				{/*Description field*/}
				<Col>
					<Description
						description={description}
						setDescription={setDescription}
					/>
				</Col>
			</Row>

			{/*Submit button*/}
			<Row className="my-5">
				<Col className="col-md-3 mb-4">
					<Button className={styles.button} type="submit">
						Submit
					</Button>
				</Col>
			</Row>
		</Form>
	);
}
