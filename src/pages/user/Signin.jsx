import axios from "axios";
import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Header";
import { UserContext } from "../../useContext";
//import { login } from "../../components/reusables/login";

const Signin = () => {
    let[isAuth, setIsAuth] = useContext(UserContext)
    const [inputs, setInputs] = useState({email: "", password: ""});
    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = inputs;
        const payload = {"email": email, "password": password};
        
        axios.post('https://jsendit-api.herokuapp.com/user/signIn', payload)
        .then((res)=>{

            if(res.status === 200){
                let token = res.data.auth_token
                console.log(token);
                localStorage.setItem("auth_token",token);
                setIsAuth(true);
                history.push("/track")
            }
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
                <h2>WELCOME BACK!!</h2>
                <form onSubmit={handleSubmit}>
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
                    <p></p>
                    <input type="submit" />
                </form>
                
                <p><Link to=""> Forgot Password? </Link></p>
                <p>New to sendIT?<Link to="/signup"> Sign-up </Link></p> 

            </div>
        </>
        
    )
};
export default Signin