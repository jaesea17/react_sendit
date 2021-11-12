import { Link } from "react-router-dom";

const Activities = () => {
    return(
        <div className="nav2">
            <ul>
                <li className="button">
                    <Link to="/quote">Quote</Link>
                </li>
                <li className="button">
                    <Link to="/orders">Orders</Link>
                </li>
                <li className="button">
                    <Link to="/track">Track</Link>
                </li>
            </ul>
        </div>
    )
};
export default Activities