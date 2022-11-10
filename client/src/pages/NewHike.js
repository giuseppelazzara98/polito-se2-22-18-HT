import { Container } from 'react-bootstrap';
import NewHikeForm from '../components/Navbar/NewHikeForm';

export default function NewHike(props) {
	return (
		<Container>
			<h1 className="my-5">New Hike</h1>
			<NewHikeForm />
		</Container>
	);
}
