import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import API from "../../API/api";
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
export default function MyHikes(props){
    const [hikesOwnded, setHikesOwned] = useState([]);
    const [hikesState, setHikesState] = useState('Completed');

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
                hikesOwnded.map((hike) => {
                    return(
                        <div key={hike.id_hike}>
                            <h2>Name: {hike.hike_name}</h2>
                            <p>Start time: {hike.start_time}</p>
                            <p>End time: {hike.end_time}</p>
                            <p>State: {hike.state}</p>
                            <p>Registered: {hike.registered}</p>
                        </div>
                    )
                })
            }
            <div className={`table table-sm table-hover ${styles.wrap}`}>

                <div className={styles.dataName}>
                    <span>Name</span>
                    <span>Start Time</span>
                    <span>End Time</span>
                    <span>State</span>
                    <span>Registered</span>
                </div>
                <div className={styles.bodyHinner}>
                    {hikesOwnded.map((hike) => (
                        <div key={hike.id_hike}>
                         <span>{hike.hike_name}</span>
                         <span>{hike.start_time}</span>
                         <span>{hike.end_time}</span>
                         <span>{hike.state}</span>
                         <span>{hike.registered}</span>
                         </div>
                    ))}
                    {props.hikes?.length === 0 && (
                        <div className={styles.hikeRow}>
                            <span>There is no result</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )


}