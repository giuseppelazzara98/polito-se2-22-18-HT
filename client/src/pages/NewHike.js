import { Container } from 'react-bootstrap';
import NewHikeForm from '../components/NewHikeForm/NewHikeForm';


export default function NewHike(props) {
	const {setUpdateHikes} = props;
	return (
		<Container>
			<h1 className="my-5 title" >New Hike</h1>
			<NewHikeForm setUpdateHikes={setUpdateHikes}/>
		</Container>
	);
}
