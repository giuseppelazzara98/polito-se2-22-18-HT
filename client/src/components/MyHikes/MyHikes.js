import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import API from "../../API/api";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from "react-bootstrap";
import dayjs from "dayjs";


export default function MyHikes(props) {
    const {hikesOwned, setHikesOwned} = props;
    // const [hikesOwned, setHikesOwned] = useState([]);
    // const [hikesState, setHikesState] = useState('Completed');
    // useEffect(() => {
    //     API.getOwnedHikes().then((res) => {
    //         setHikesOwned(res.filter((hike) => hike.state === 2));
    //     })
    // }, [])

    // useEffect(() => {
    //     if (hikesState === 'Completed') {
    //         API.getOwnedHikes().then((res) => {
    //             setHikesOwned(res.filter((hike) => hike.state === 2));
    //         })
    //     } else if (hikesState === 'Ongoing') {
    //         API.getOwnedHikes().then((res) => {
    //             setHikesOwned(res.filter((hike) => hike.state === 1));
    //         })
    //     } else if (hikesState === 'All') {
    //         API.getOwnedHikes().then((res) => {
    //             setHikesOwned(res);
    //         })
    //     } else if (hikesState === 'Not Started') {
    //         API.getOwnedHikes().then((res) => {
    //             setHikesOwned(res.filter((hike) => hike.state === 0));
    //         })
    //     }
    // }, [hikesState])

    return (
        <>
            {/* <CDropdown >
                <CDropdownToggle >{hikesState}</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem onClick={() => { setHikesState('Completed') }}>Completed</CDropdownItem>
                    <CDropdownItem onClick={() => { setHikesState('Ongoing') }}>Ongoing</CDropdownItem>
                    <CDropdownItem onClick={() => { setHikesState('All') }}>All</CDropdownItem>
                    <CDropdownItem onClick={() => { setHikesState('Not Started') }}>Not Started</CDropdownItem>
                </CDropdownMenu>
            </CDropdown> */}
            <h1>My Hikes</h1>
            <div className={`table table-sm table-hover ${styles.wrap}`}>
                <div className={styles.dataName}>
                    <span>Name</span>
                    <span>Start Time</span>
                    <span>End Time</span>
                    <span>State</span>
                </div>
                <div className={styles.bodyWrap}>
                    {hikesOwned.map((hike) => <MyHikeRow hike={hike} key={`${hike.id_hike}_${hike.state}`} setHikesOwned={setHikesOwned}/>)}
                    {hikesOwned.length === 0 && (
                        <div className={styles.hikeRow}>
                            <span>You're registered to any hikes yet. Let's register on the homepage</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )


}

const InputForm = (props) => {
    const {
        handelSubmit,
        date,
        time,
        setDate,
        setTime,
        labelButton,
        formValid = true,
        formError,
    } = props;

    return (
        <div className={styles.inputForm}>
            <Form onSubmit={handelSubmit} className={styles.formGroup}>
                <Form.Control type='date' value={date} onChange={ev => setDate(ev.target.value)} className={`${!formValid && !date && styles.inputError}`}/>
                <Form.Control type="time" value={time} onChange={ev => setTime(ev.target.value)} className={`${!formValid && !time && styles.inputError}`}/>
                <Button type="submit" className={styles.button}>{labelButton}</Button>
            </Form>
            {!formValid && <span className={styles.formError}>{formError}</span>}
        </div>
    )
}

function MyHikeRow(props) {
    const { hike, setHikesOwned } = props;
    const [tab, setTab] = useState(false);
    const [time, setTime] = useState(dayjs().format("HH:mm"));
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [validForm, setValidForm] = useState(true);
    let state = "";

    const handelSubmit = (event) => {
        event.preventDefault();
        if (date && time) {
            setValidForm(true);
            let startTime = date + " " + time;
            API.startHike({ id_hike: hike.id_hike, start_time: startTime }).then(() => {
                API.getOwnedHikes().then((res) => {
                    setHikesOwned(res);
                })
            });
        } else {
            setValidForm(false);
        }
    }

    const getLabelState = () => {
        switch (hike.state) {
            case 0:
                state = "Not Started";
                break;
            case 1:
                state = "Ongoing";
                break;
            case 2:
                state = "Completed";
                break;
            default:
                state = "";
        }
        return state;
    }

    return (
        <div className={styles.hikeRow}>
            <div className={styles.hikeFirstRow}>
                <span>{hike.hike_name}</span>
                <span>{hike.start_time}</span>
                <span>{hike.end_time}</span>
                <span>{getLabelState()}</span>
                <Button onClick={() => { setTab(!tab) }} className={styles.button}>
                    <FontAwesomeIcon icon={faGear} className={styles.optionIcon}/>
                </Button>
            </div>
            {tab ? (
                <div className={styles.bottomWrap}>
                    {hike.state === 0 && (
                        <>
                            <span className={styles.disclaimer}>Your hike is not started yet. Insert date and time!</span>
                            <div className={styles.optionWrap}>
                                <InputForm
                                    handelSubmit={handelSubmit}
                                    date={date}
                                    time={time}
                                    setDate={setDate}
                                    setTime={setTime}
                                    labelButton={"Start"}
                                    formValid={validForm}
                                    formError={"Please, insert a valid date and time"}
                                />
                            </div>
                        </>
                    )}
                </div>
            ) : ("")}
        </div>
    );
}



