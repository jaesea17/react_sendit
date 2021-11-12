import axios from "axios";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import { UserContext } from "../../useContext";

const AdminSignin = () => {
    const [details, setDetails] = useState({ idNumber: "", password: ""});
    let [adAuth, setAdAuth] = useContext(UserContext);
    console.log("adAuth:", adAuth);
    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    };

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const {idNumber, password} = details;
        const payload = {"idNumber": idNumber, "password": password};

        axios.post('http://localhost:3000/admin/signIn',payload)
        .then((res) => {
            if(res.status === 200){
                let token = document.cookie;
                localStorage.setItem("auth_token_ad",token);
                setAdAuth(true);
                history.push("/admin/admin_track")
            }
        
        }).catch((err) => {
            console.log(err);
        })
    };

    return(
        <>
            <Header />
            <div className="nav">
                <ul>
                    <li>  
                        <Link to="/admin/admin_track">admin-track</Link>                   
                    </li>
                </ul>
            </div>
            <div>
                <h2>Admin details!!</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        ID Number:
                        <input
                            type="text"
                            name="idNumber"
                            value={details.idNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={details.password}
                            onChange={handleChange}
                        />
                    </label>

                    <input type= "submit" value= "signin" />
                </form>

                <p><Link to="">Forgot Password?</Link></p>
                <p>Don't have an Admin Account? <Link to="/admin/admin_signup">Sign-up</Link></p> 

            </div>
        </>
    )
};
export default AdminSignin