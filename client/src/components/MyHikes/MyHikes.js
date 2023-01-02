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
    const [hikesFilteredList, setHikesFilteredList] = useState([]);
    const [hikesState, setHikesState] = useState('All');
    useEffect(() => {
        setHikesFilteredList(hikesOwned);
        switch (hikesState) {
            case 'Completed':
              setHikesFilteredList(hikesOwned.filter((hike) => hike.state === 2));
              break;
            case 'Ongoing':
              setHikesFilteredList(hikesOwned.filter((hike) => hike.state === 1));
              break;
            case 'Not Started':
              setHikesFilteredList(hikesOwned.filter((hike) => hike.state === 0));
              break;
            case 'All':
              setHikesFilteredList(hikesOwned);
              break;
            default:
                setHikesFilteredList(hikesOwned);
              break;
          }
          
    }, [hikesOwned, hikesState]);

    return (
        <>
 
            <h1>My Hikes</h1>
            <div className={`table table-sm table-hover ${styles.wrap}`}>
            { <CDropdown className={styles.dropdown} >
                <CDropdownToggle className={styles.buttonDrop}>{hikesState}</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('Completed') }}>Completed</CDropdownItem>
                    <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('Ongoing') }}>Ongoing</CDropdownItem>
                    <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('All') }}>All</CDropdownItem>
                    <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('Not Started') }}>Not Started</CDropdownItem>
                </CDropdownMenu>
    </CDropdown> }
                <div className={styles.dataName}>
                    <span>Name</span>
                    <span>Start Time</span>
                    <span>End Time</span>
                    <span>State</span>
                </div>
                <div className={styles.bodyWrap}>
                    {hikesFilteredList.map((hike) => <MyHikeRow hike={hike} key={`${hike.id_hike}_${hike.state}`} setHikesOwned={setHikesOwned}/>)}
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



