import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../useContext";

export const AdminSignout = () => {
    let [adAuth, setAdAuth ] = useContext(UserContext);
    console.log("adAuth:",adAuth)
    let history = useHistory();
    return(
        <>
            <h2> are you sure you want to exit the app</h2>

            <button onClick = { () => {
                setAdAuth(false);
                localStorage.removeItem("auth_token_ad");
                history.push("/admin")
            }}>sign-out</button>
        </>
    )
};