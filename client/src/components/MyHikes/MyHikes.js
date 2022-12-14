import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import API from "../../API/api";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Button, Form } from "react-bootstrap";
import dayjs from "dayjs";

let isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

export default function MyHikes(props) {
    const {hikesOwned, setHikesOwned, setEndHikeSuccess, setShowEndHikeError, setShowStartHikeSuccess,setShowStartHikeError} = props;
    const [hikesFilteredList, setHikesFilteredList] = useState([]);
    const [hikesState, setHikesState] = useState('All');
    useEffect(() => {
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
            <div className={styles.dropdownContainer}>
                <CDropdown className={styles.dropdown} >
                    <CDropdownToggle className={styles.buttonDrop}>{hikesState}</CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('Completed') }}>Completed</CDropdownItem>
                        <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('Ongoing') }}>Ongoing</CDropdownItem>
                        <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('All') }}>All</CDropdownItem>
                        <CDropdownItem className={styles.orderBy} onClick={() => { setHikesState('Not Started') }}>Not Started</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </div>
            <div className={` ${styles.containerWrap}`}>
                <div className={`table table-sm table-hover ${styles.wrap}`}>
                    <div className={styles.dataName}>
                        <span>Name</span>
                        <span>Start Time</span>
                        <span>End Time</span>
                        <span>State</span>
                    </div>
                    <div className={styles.bodyWrap}>
                        {hikesFilteredList.map((hike) => <MyHikeRow hike={hike} key={`${hike.id_hike}_${hike.state}`} setHikesOwned={setHikesOwned} setEndHikeSuccess={setEndHikeSuccess} setShowEndHikeError={setShowEndHikeError} setShowStartHikeSuccess={setShowStartHikeSuccess} setShowStartHikeError={setShowStartHikeError}/>)}
                        {hikesOwned.length === 0 && (
                            <div className={styles.hikeRow}>
                                <span>You're not registered to any hikes yet. Let's register on the homepage</span>
                            </div>
                        )}
                        {hikesOwned.length !== 0 && hikesFilteredList.length === 0 && (
                            <div className={styles.hikeRow}>
                                <span>0 hike found</span>
                            </div>
                        )}
                    </div>
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
    const { hike, setHikesOwned, setEndHikeSuccess, setShowEndHikeError, setShowStartHikeSuccess,setShowStartHikeError } = props;
    const [tab, setTab] = useState(false);
    const [time, setTime] = useState(dayjs().format("HH:mm"));
    const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [validForm, setValidForm] = useState(true);
    let state = "";

    const handelSubmit = (event) => {
        event.preventDefault();
        let valid = true;
        if (date && time && (hike.state === 0 || hike.state === 1)) {
            if (hike.state === 1) {
                let startDate = hike.start_time.split(" ")[0]
                if (dayjs(date, "YYYY-MM-DD").isBefore(dayjs(startDate, "YYYY-MM-DD"), "day")) {
                    valid = false;
                } else if (dayjs(date, "YYYY-MM-DD").isSame(dayjs(startDate, "YYYY-MM-DD"), "day")) {
                    let startTime = dayjs(hike.start_time, "YYYY-MM-DD HH:mm").format("HH:mm");
                    let newStartTime = dayjs().hour(startTime.split(":")[0]).minute(startTime.split(":")[1])
                    let newEndTime = dayjs().hour(time.split(":")[0]).minute(time.split(":")[1]);
                    if (dayjs(newEndTime).isSameOrBefore(dayjs(newStartTime), "minute")) {
                        valid = false;
                    }
                }
            }
            if (valid) {
                let dateTime = date + " " + time;
                if (hike.state === 0) {
                    API.startHike({ id_hike: hike.id_hike, start_time: dateTime }).then(() => {
                        API.getOwnedHikes().then((res) => {
                            setHikesOwned(res);
                        })
                        setShowStartHikeSuccess(true);
                        setTimeout(() => {
                            setShowStartHikeSuccess(false)
                        }, 2500);
                    }).catch(() => {
                        setShowStartHikeError(true);
                        setTimeout(() => {
                            setShowStartHikeError(false)
                        }, 2500);
                    });
                } else if (hike.state === 1) {
                    API.endHike({id_hike: hike.id_hike, end_time: dateTime}).then(() => {
                        setEndHikeSuccess(true);
                        API.getOwnedHikes().then((res) => {
                            setHikesOwned(res);
                        })
                    }).catch(() => {
                        setShowEndHikeError(true);
                    }).finally(() => {
                        setTimeout(() => {
                            setShowEndHikeError(false);
                            setEndHikeSuccess(false);
                        }, 2500)
                    });
                }
            }
        } else {
            valid = false;
        }
        if (valid) {
            setValidForm(true);
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
                <span>{hike.start_time ? dayjs(hike.start_time, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm") : ""}</span>
                <span>{hike.end_time ? dayjs(hike.end_time, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm") : ""}</span>
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
                    {hike.state === 1 && (
                        <>
                            <span className={styles.disclaimer}>Hike already started. Insert an end time to terminate it!</span>
                            <div className={styles.optionWrap}>
                                <span className={styles.hikeInfo}>Hike start date-time: {dayjs(hike.start_time, "YYYY-MM-DD HH:mm").format("DD/MM/YYYY HH:mm")}</span>
                                <InputForm
                                    handelSubmit={handelSubmit}
                                    date={date}
                                    time={time}
                                    setDate={setDate}
                                    setTime={setTime}
                                    labelButton={"End hike"}
                                    formValid={validForm}
                                    formError={"Please, insert a valid date and time. It must be after the start time"}
                                />
                            </div>
                        </>
                    )}
                    {hike.state === 2 && (
                        <>
                            <span className={styles.disclaimer}>Hike terminated. Good job!</span>
                        </>
                    )}
                </div>
            ) : ("")}
        </div>
    );
}



