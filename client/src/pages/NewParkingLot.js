import { Container } from 'react-bootstrap';
import NewHutParkingForm from "../components/NewHutParkingForm/NewHutParkingForm"

export default function NewParkingLot(props){
    const {provincesFacets} = props;
    return(
        <Container>
            <h1 className="my-5 title">New Parking Lot</h1>
            <NewHutParkingForm setShowAddNewSuccess={props.setShowAddNewParkingLotSuccess} setShowAddNewError={props.setShowAddNewParkingLotError} provincesFacets={provincesFacets}/>
        </Container>);
}