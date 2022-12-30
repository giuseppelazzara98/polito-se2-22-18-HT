import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import API from "../../API/api";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay} from '@fortawesome/free-solid-svg-icons';
import {Button,Form} from "react-bootstrap";
import dayjs from 'dayjs';


export default function MyHikes(props){
    const [hikesOwned, setHikesOwned] = useState([]);
    const [hikesState, setHikesState] = useState('All');
    let state;
    useEffect(() => {
        API.getOwnedHikes().then((res) => {
            setHikesOwned(res.filter((hike) => hike.state === 2));
        })
    }, [])

    useEffect(() => {
        if(hikesState === 'Completed'){
            API.getOwnedHikes().then((res) => {
                setHikesOwned(res.filter((hike) => hike.state === 2));
            })
        } else if(hikesState === 'Ongoing'){
            API.getOwnedHikes().then((res) => {
                setHikesOwned(res.filter((hike) => hike.state === 1));
            })
        } else if(hikesState === 'All'){
            API.getOwnedHikes().then((res) => {
                setHikesOwned(res);
            })
        } else if(hikesState === 'Not Started'){
            API.getOwnedHikes().then((res) => {
                setHikesOwned(res.filter((hike) => hike.state === 0));
            })
        }
    }, [hikesState])

    return(
        <>
            <CDropdown >
                <CDropdownToggle >{hikesState}</CDropdownToggle>
                <CDropdownMenu>
                    <CDropdownItem  onClick={() => { setHikesState('Completed') }}>Completed</CDropdownItem>
                    <CDropdownItem  onClick={() => { setHikesState('Ongoing') }}>Ongoing</CDropdownItem>
                    <CDropdownItem  onClick={() => { setHikesState('All') }}>All</CDropdownItem>
                    <CDropdownItem  onClick={() => { setHikesState('Not Started') }}>Not Started</CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
            <h1>My Hikes</h1>
            {
                hikesOwned.map((hike) => {
                    
                    switch(hike.state){
                        case 0:
                            state="Not Started";
                            break;
                        case 1:
                            state="Ongoing";
                            break;
                        case 2:
                            state="Completed";
                            break;
                        default:
                            state="";
                    }
                    return(<>
                    
                        <div className={`table table-sm table-hover ${styles.wrap}`}>
                            <div className={styles.dataName}>
                                <span>Name</span>
                                <span>Start Time</span>
                                <span>End Time</span>
                                <span>State</span>
                            </div>
                            <div className={styles.bodyWrap}>
                                <MyHikeRow hike={hike} state={state} key={hike.id_hike}/>
                            </div>
                        </div>

                    </>
                    
                    )
                })
            }
            
        </>
    )


}

function MyHikeRow(props){
    const {hike,state}=props;
    const [tab,setTab]=useState(false);
    const [time,setTime]=useState();
    const [date,setDate]=useState();
    
    const handelSubmit=(event)=>{
        let startTime=date+" "+time;
        console.log(startTime);
        API.startHike({id_hike:hike.id_hike,start_time:startTime});
    }

    return (
        <div className={styles.hikeRow}>
            <div className={styles.hikeFirstRow}>
                <span>{hike.hike_name}</span>
                <span>{hike.start_time}</span>
                <span>{hike.end_time}</span>
                <span>{state}</span>
                <div className={styles.flexcontainer}>
                    <Button onClick={() => { setTab(true) }}>
                        <FontAwesomeIcon icon={faPlay} />
                    </Button>
                </div>
            </div>
            {tab ? (
                <Form  onSubmit={handelSubmit}>
                <div className={styles.innerTable}>
                    <Form.Control type='date' value={date ? dayjs(date).format('YYYY-MM-DD') : ''} onChange={ev => setDate(ev.target.value)} />
                    <Form.Control type="time" value={date ? dayjs(time).format('LT') : ''} onChange={ev => setTime(ev.target.value)}/>
                    <Button type="submit">Start</Button>
                </div>
                </Form>
            ) : ("")}
        </div>
    );
}



