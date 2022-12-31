import { Container } from "react-bootstrap";
import MyHikes from "../components/MyHikes/MyHikes";
export default function OwnHikes(props) {
    const { hikesOwned, setHikesOwned } = props;
    return (
        <>
            <Container>
                <MyHikes hikesOwned={hikesOwned} setHikesOwned={setHikesOwned}/>
            </Container>

        </>
    )
}