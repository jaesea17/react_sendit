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
        const {statuss, location, orderNumber} = details;
        const payload = {"status": statuss, "location": location,
        "orderNumber": orderNumber};
       
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
                        />
                    </label>
                    <label>
                        location:
                        <input 
                            type="text"
                            name="location"
                            value={details.location}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        order number:
                        <input 
                            type="text"
                            name="orderNumber"
                            value={details.orderNumber}
                            onChange={handleChange}
                        />
                    </label>
                </form>
            </div>
        </>
    )
};
export default StatusAndLocation