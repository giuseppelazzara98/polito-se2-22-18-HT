import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Insert from "./Insert"
import styles from "./index.module.scss";


export default function NewHutForm(props){
    const {setShowAddNewHutSuccess, setShowAddNewHutError,isHut=false} =
		props;
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [altitude,setAltitude]=useState(0);
    const [nBeds,setNBeds]=useState(0);
    const [phoneNumber,setPhoneNumber]=useState("");
    const [email,setEmail]=useState("");
    const [webSite,setWebSite]=useState("");
    const [capacity,setCapacity]=useState(0);


    const handleSubmit = (event) =>{
        event.preventDefault();
		let valid = true;
		const form = event.currentTarget;
		const hut = {
			name,
			altitude,
            nBeds,
            phoneNumber,
            email,
            webSite,
			description
		};
        
    }

    return(
        <Form
        className="text-start"
        noValidate
       //validated={validated}
        onSubmit={handleSubmit}
        >
            <Row className="mb-3">
				<Col>				
					<Insert title={"Name"} type={"text"} param={name} setParam={setName} placeholder={"Name of the Hut"} minLength={4} maxLength={30}/>
				</Col>
				<Col>
                    <Insert title={"Altitude"} type={"number"} param={altitude} setParam={setAltitude} placeholder={"Altitude"} text={"Altitude in meters"} min={0} max={8000}/>
				</Col>
			</Row>
            {isHut?(
            <div>
            <Row className="mb-3">
				<Col>				
					<Insert title={"Number Of Beds"} type={"number"} param={nBeds} setParam={setNBeds} placeholder={"Number of beds"} min={0}/>
				</Col>
				<Col>
                    <Insert title={"Web Site"} type={"text"} param={webSite} setParam={setWebSite} placeholder={"Link of the web site"} required={false} />
				</Col>
			</Row>
            <Row className="mb-3">
				<Col>				
					<Insert title={"Email"} type={"email"} param={email} setParam={setEmail} placeholder={"Email"} />
				</Col>
				<Col>
                    <Insert title={"Phone Number"} type={"text"} param={phoneNumber} setParam={setPhoneNumber} placeholder={"Phone Number"} />
				</Col>
			</Row>
            <Row className="mb-3">
				{/*Description field*/}
				<Col>
                    <Insert title={"Description"} type={"textarea"} param={description} setParam={setDescription}  as={"textarea"}/>
				</Col>
			</Row>
            <Button className={styles.button} type="submit">
                Submit
            </Button>
            </div>):(
            <div>
                <Row className="mb-3">
				{/*Description field*/}
				<Col>
                    <Insert title={"Position"} type={"textarea"} param={description} setParam={setDescription}  as={"textarea"}/>
				</Col>
			</Row>
            <Row className="mb-3">
				{/*Description field*/}
				<Col>
                    <Insert title={"Capacity"} type={"number"} param={description} setParam={setDescription}  min={0}/>
				</Col>
			</Row>
            </div>)
            }
        </Form>
    );
}