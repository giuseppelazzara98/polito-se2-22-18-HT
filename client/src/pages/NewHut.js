import { Container } from 'react-bootstrap';
import NewHutForm from '../components/NewHutForm/NewHutForm';

export default function NewHut(props){
    return(
        <Container>
            <h1>New Hut</h1>
            <NewHutForm setShowAddNewHutSuccess={props.setShowAddNewHutSuccess} setShowAddNewHutError={props.setShowAddNewHutError}/>
        </Container>);
}