import { Container } from "react-bootstrap";
import MyHikes from "../components/MyHikes/MyHikes";
import { CiMountain1 } from 'react-icons/ci';

export default function OwnHikes(props) {
    const { hikesOwned, setHikesOwned } = props;
    return (
        <>
            <Container>
                <h1 className="my-5">
                    {' '}
                    <CiMountain1 color="black" size={50} /> My Hikes
                </h1>
                <MyHikes hikesOwned={hikesOwned} setHikesOwned={setHikesOwned}/>
            </Container>

        </>
    )
}