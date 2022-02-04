import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";

const Signup = () => {
    const [inputs, setInputs] = useState({firstName: "", lastName: "",email: "",password: ""});
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const{firstName, lastName, email, password} = inputs;
        const payload = {
            "firstName": firstName, "lastName": lastName,
            "email": email, "password": password        
        }
        axios.post('https://jsendit-api.herokuapp.com/user/signUp', payload)
        .then((res)=>{
            if(res.status === 200){
                history.push("/signin");
            }
            //location.href = "../User/sendIT_sign-in.html" 
        }).catch((err)=>{
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs, [name]: value})
    }

    return(
        <>
            <Header />
            <div className="sign_up_in">
                <h2>Connecting the world a Parcel at a time...</h2>
                <h3>welcome to the family!</h3>
                <form onSubmit={handleSubmit}>
                    <label>First Name:
                        <input
                        type="text"
                        name="firstName"
                        value={inputs.firstName || ""}                    
                        onChange={handleChange}
                        />
                    </label>
                    <label>Last Name:
                        <input
                        type="text" 
                        name="lastName"
                        value={inputs.lastName || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>Email:
                        <input
                        type="email" 
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <label>Password:
                        <input
                        type="password" 
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                        />
                    </label>
                    <li style={{listStyle: "none"}}>(Password must be atleast 6 characters)</li>

                    <p>By clicking Sign-up, you agree to sendIT's User Agreement, Private Policy</p>
                    <input type="submit" value="signup"/>
                </form>
                <p>Already on sendIT?<Link to="/signin">signin</Link></p>
            </div>
        </>
    )
};
export default Signup