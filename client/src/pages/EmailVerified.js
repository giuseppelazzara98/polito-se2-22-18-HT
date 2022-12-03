import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../API/api";



export default function EmailVerified(props){
    let {id} = useParams();
    const navigate = useNavigate();
    console.log("ID:"+id);
    useEffect(() => {
        const verifyEmail = async () => {
            try {
                //const user = await API.verifyEmail(id);
                props.setShowEmailVerificationSuccess(true);
                setTimeout(() => {props.setShowEmailVerificationSuccess(false)}, 2500);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        };
        verifyEmail();
    }, []);
    
    return (
        <></>
    );
   
   
   
}
  

