import axios from "axios";
import { useState } from "react/cjs/react.development";
import ExitAdmin from "../../components/ExitAdmin";
import Header from "../../components/Header";

const StatusAndLocation = () => {
    const [details, setDetails] = useState({statuss: "", location: "", orderNumber: ""});

    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let authToken = localStorage.getItem("auth_token_ad");
        const {statuss, location, orderNumber} = details;
        const payload = {
            "status": statuss, "location": location,
            "orderNumber": orderNumber,
            headers: {"Set-Cookie" : authToken}
        };
       
        axios.put('https://jsendit-api.herokuapp.com/inventory/orders/admin/:orderNumber',payload)
        .then((res) => {
            if(res.status === 200){
                console.log("successful!!")
            }
        }).catch((err) => {
            console.log(err)
        })
    };

    return(
        <>
            <Header />
            <ExitAdmin />
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        status:
                        <input 
                            type="text"
                            name="status"
                            value={details.statuss}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                    <label>
                        location:
                        <input 
                            type="text"
                            name="location"
                            value={details.location}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                    <label>
                        order number:
                        <input 
                            type="text"
                            name="orderNumber"
                            value={details.orderNumber}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                </form>
            </div>
        </>
    )
};
export default StatusAndLocation