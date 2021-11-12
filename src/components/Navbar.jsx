import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="nav">
            <ul>
                <li>  
                    <Link to="/signin">Sign-in</Link>                   
                </li>
                <li>  
                    <Link to="/signup">Sign-up</Link>
                </li>
                <li>  
                    <Link to="/contact">Contact</Link>
                </li>
                <li>  
                    <Link to="/about">About</Link>
                </li>
                <li>  
                    <Link to="admin">Admin</Link>
                </li>
            </ul>
        </div>
    )
};
export default Navbar