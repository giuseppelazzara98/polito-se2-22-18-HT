import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Insert from "./Insert"
import styles from "./index.module.scss";
import API from '../../API/api';
import { useMediaQuery } from "react-responsive";
import { maxBreakpoints } from "../../helpers/configs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Map from '../ClickableMap/ClickableMap';


export default function NewHutForm(props) {
    const { setShowAddNewSuccess, setShowAddNewError, isHut = false, provincesFacets } =
        props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [altitude, setAltitude] = useState(0);
    const [nBeds, setNBeds] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [webSite, setWebSite] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [formValidated, setFormValidated] = useState(false);
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: maxBreakpoints.tabletLandscape });
    const [province, setProvince] = useState({});
    const [mapOpen, setMapOpen] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        let valid = true;
        const form = event.currentTarget;
        
        if (form.checkValidity() === false || province.coordinates?.length !== 2) {
            valid = false;
        } else {
            const provinceId = provincesFacets.filter(provinceFacet => provinceFacet.value?.trim() === province?.province?.trim())?.[0]?.id;
            if (!provinceId) {
               
                    setShowAddNewError(true);
                    setTimeout(() => {
                        setShowAddNewError(false)
                    }, 2500);
                
            } else {
                if (isHut) {
                    const hut = {
                        name,
                        altitude,
                        nBeds,
                        phone: phoneNumber,
                        email,
                        website: webSite,
                        description,
                        latitude: province.coordinates[0],
                        longitude: province.coordinates[1],
                        type: "hut",
                        province: provinceId,
                    };
                    API.insertHut(hut).then((response) => {
                        setShowAddNewSuccess(true);
                        setTimeout(() => {
                            setShowAddNewSuccess(false)
                        }, 2500);
                    }).catch(() => {
                        setShowAddNewError(true);
                        setTimeout(() => {
                            setShowAddNewError(false)
                        }, 2500);
                    });
                    navigate('/');
                }
                else{
                    const parkingLot={
                        province: provinceId,
                        name,
                        description,
                        latitude: province.coordinates[0],
                        longitude: province.coordinates[1],
                        type: "parking lot",
                        capacity
                    };
                    API.insertParkingLot(parkingLot).then((response) => {
                        setShowAddNewSuccess(true);
                        setTimeout(() => {
                            setShowAddNewSuccess(false)
                        }, 2500);
                    }).catch(() => {
                        setShowAddNewError(true);
                        setTimeout(() => {
                            setShowAddNewError(false)
                        }, 2500);
                    });
                    navigate('/');
                }
            }
        }
        setFormValidated(true);
    }

    useEffect(() => {
        setMapOpen(false);
    }, [isMobile]);

    return (
        <Form
            className="text-start"
            noValidate
            validated={formValidated}
            onSubmit={handleSubmit}
        >
            <Row>
                <Col>
                    <Row className="mb-3">
                        <Col>
                            <Insert title={"Name"} type={"text"} param={name} setParam={setName} placeholder={"Name"} minLength={4} maxLength={30} invalid={"The name of the hut must be between 4 and 30 character long"}/>
                        </Col>
                        {isHut && (
                            <Col>
                                <Insert title={"Altitude"} type={"number"} param={altitude} setParam={setAltitude} placeholder={"Altitude"} text={"Altitude in meters"} min={0} max={8000} invalid={"The altitude must be an integer between 0 and 8000 meters"}/>
                            </Col>
                        )}
                    </Row>
                    {isHut && (
                        <>
                            <Row className="mb-3">
                                <Col>
                                    <Insert title={"Number Of Beds"} type={"number"} param={nBeds} setParam={setNBeds} placeholder={"Number of beds"} min={1} invalid={"The number of beds must be grater than 0"}/>
                                </Col>
                                <Col>
                                    <Insert title={"Web Site"} type={"text"} param={webSite} setParam={setWebSite} placeholder={"Link of the web site"} required={false} text={"es. https://sitedomain.com"} pattern={"^https?://+([a-zA-Z0-9]){2,}.com"} invalid={"Invalid web site URL"}/>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Insert title={"Email"} type={"email"} param={email} setParam={setEmail} placeholder={"Email"} invalid={"Invalid email"}/>
                                </Col>
                                <Col>
                                    <Insert title={"Phone Number"} type={"text"} param={phoneNumber} setParam={setPhoneNumber} placeholder={"Phone Number"} minLength={10} maxLength={15} pattern={"\+([0-9]){9}(([0-9][0-9]){1,2})?([0-9])?"} text={"es. +391504896352"} invalid={"Invalid phone number"}/>
                                </Col>
                            </Row>
                        </>
                    )}
                    {!isHut && (
                        <>
                            <Row className="mb-3">
                                {/*Description field*/}
                                <Col>
                                    <Insert title={"Capacity"} type={"number"} param={capacity} setParam={setCapacity} min={0} invalid={"Capacity must be grater than 0"} />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                {/*Description field*/}
                                <Col>
                                    <Insert title={"Description"} type={"textarea"} param={description} setParam={setDescription} as={"textarea"} required={false}/>
                                </Col>
                            </Row>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <Row className='justify-content-between mb-3 align-items-center'>
                                <Col>
                                    <span className={styles.title}>
                                        Province: <span className={`${province?.coordinates?.length === 2 ? styles.province : styles.noProvince} ${formValidated && province?.coordinates?.length !== 2 && styles.error}`}>
                                            {province?.coordinates?.length === 2 ? province?.province || "name of province not found" : "no province selected"}
                                        </span>
                                    </span>
                                </Col>
                                <Col className='col-4'>
                                    <button type='button' className={`${styles.toggle} ${mapOpen && styles.open}`} onClick={() => setMapOpen(!mapOpen)}>{mapOpen ? "Close" : "View"} the map <FontAwesomeIcon icon={faChevronDown} className={styles.toggleIcon} /></button>
                                </Col>
                            </Row>
                            {mapOpen && (
                                <Row className='mb-3'>
                                    <Col>
                                        <Map point={province} setPoint={setProvince} />
                                    </Col>
                                </Row>
                            )}
                        </>
                    )}
                    {isHut && (
                        <Row className="mb-3">
                            {/*Description field*/}
                            <Col>
                                <Insert title={"Description"} type={"textarea"} param={description} setParam={setDescription} as={"textarea"} required={false}/>
                            </Col>
                        </Row>
                    )}
                    <Button className={`${styles.button} mb-4`} type="submit">
                        Submit
                    </Button>
                </Col>
                {!isMobile && (
                    <Col>
                        <Row className='mb-3'>
                            <Col>
                                <span className={styles.title}>
                                    Province: <span className={`${province?.coordinates?.length === 2 ? styles.province : styles.noProvince} ${formValidated && province?.coordinates?.length !== 2 && styles.error}`}>
                                        {province?.coordinates?.length === 2 ? province?.province || "name of province not found" : "no province selected"}
                                    </span>
                                </span>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col>
                                <Map point={province} setPoint={setProvince} />
                            </Col>
                        </Row>
                    </Col>
                )}
            </Row>
        </Form>
    );
}