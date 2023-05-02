import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import success from "../images/success.png"
import axios from "axios";
import "../App.css";
import NotFound from "./NotFound";

const EmailVerifyScreen = () => {

    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async() => {
            try {
                const url = `/api/users/${param.id}/verify/${param.token}`;
                const {data} = await axios.get(url);
                setValidUrl(true)
            } catch(error) {
                setValidUrl(false)
            }
        };

        verifyEmailUrl();
    }, [param, validUrl])

    return (
        <>
            {validUrl ? (
                <div className="emailContainer">
                    <img src={success} alt="success_img" className="successImage" />
                    <h1>Email Verified Successfully</h1>
                    <Link to="/login">
                        <button className="greenButton">Login</button>
                    </Link>
                </div>
            ) : (
                <>
                    <NotFound />
                </>
            )}
        </>
    )
}

export default EmailVerifyScreen