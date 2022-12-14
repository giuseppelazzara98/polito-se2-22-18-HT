import { Container } from 'react-bootstrap';
import NewHutParkingForm from "../components/NewHutParkingForm/NewHutParkingForm"

export default function NewHut(props){
    const {provincesFacets} = props;
    return(
        <Container>
            <h1 className="my-5 title">New Hut</h1>
            <NewHutParkingForm setShowAddNewSuccess={props.setShowAddNewHutSuccess} setShowAddNewError={props.setShowAddNewHutError} isHut={true} provincesFacets={provincesFacets}/>
        </Container>);
}