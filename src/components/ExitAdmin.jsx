import { Link } from "react-router-dom";

const ExitAdmin = () => {
    return(
        <div className="nav">
            <ul>
                <li>  
                    <Link to="/admin/admin_signout">Sign-out</Link>                   
                </li>
            </ul>
        </div>
    )
};
export default ExitAdmin