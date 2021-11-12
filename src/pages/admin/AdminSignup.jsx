import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";

const AdminSignup = () => {
    const [details, setDetails] = useState({ idNumber: "", email: "", password: ""});
    
    let history = useHistory();

    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {idNumber, email, password} = details;
        const payload = { "idNumber": idNumber,"email": email, "password": password };
        
        axios.put('https://git.heroku.com/jsendit-api.git/admin/signUp', payload)
        .then((res) => {
            if(res.status === 200){
                history.push("/adminsignin")
            }
            
        }).catch((err) => {
            console.log(err);
        })
    };

    return(
        <>
            <Header />
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
                            style={{marginLeft: "12px"}}
                        />
                    </label>
                    <label style={{display: "block"}}>
                        Email:
                        <input
                            type="email"
                            name="password"
                            value={details.email}
                            onChange={handleChange}
                            style={{marginLeft: "50px", marginTop: "10px"}}
                        />
                    </label>
                    <label style={{display: "block"}}>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={details.password}
                            onChange={handleChange}
                            style={{marginLeft: "25px", marginTop: "10px"}}
                        />
                        <li style={{listStyle: "none"}}>(Password must contain atleast 6 characters)</li>
                    </label>

                    <input type= "submit" value= "signin" style={{marginTop: "10px"}} />

                    <p>Admin signup is only for registered admins</p>
                </form>
                <p>Already have an account?<Link to="/admin">signin</Link></p>
            </div>
        </>
    )
};
export default AdminSignup