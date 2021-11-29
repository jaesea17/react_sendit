import axios from "axios";
import { useState } from "react";
import ExitAdmin from "../../components/ExitAdmin";
import Header from "../../components/Header";
import TableAdOrEdit from "../../components/tables/TableAdOrEdit";

const AdOrderEditPage = () => {
    const [details, setDetails] = useState({orderNumber: "", status: "", location: "", customerEmail: ""})
    const [adEdit, setAdEdit] = useState("");
    const tableHeading = ["ORDER NUMBER","PACKAGE","WEIGHT",
    "COUNTRY FROM","ADDRESS FROM","CITY FROM",
    "STATE FROM","COUNTRY TO","ADDRESS TO",
    "CITY TO","STATE TO","STATUS","LOCATION","CUSTOMER ID","CUSTOMER EMAIL"];


    const handleChange = (e) => {
        setDetails({...details, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       const {orderNumber, status, location, customerEmail} = details;
       let authToken = localStorage.getItem("auth_token_ad");
       const payload ={
        "orderNumber":orderNumber, "status":status,
        "location":location,  "customerEmail":customerEmail
        }

         //adding token to an instance of axios
         const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });

        authAxios.put('https://jsendit-api.herokuapp.com/inventory/orders/admin/:orderNumber',payload)
        .then((res) => {
            if(res.data.length === 0) return alert("no data"); 
            setAdEdit(res.data);      
        }).catch((err) => {
            console.log(err)
        })
    };

    return(
        <>
            <Header />
            <ExitAdmin />
            <div style={{marginBottom:"50px"}}>
                <form onSubmit={handleSubmit}>
                    Order Number:
                    <label>
                        <input 
                            type="text"
                            name="orderNumber"
                            value={details.orderNumber}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                    <h3>Update Order</h3>
                    <label>
                        Status:
                        <input 
                            type="text"
                            name="status"
                            value={details.status}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                    <label>
                        Location:
                        <input 
                            type="text"
                            name="location"
                            value={details.location}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                    
                    <p>input customer's email for notification</p>
                    <label>
                        customer email:
                        <input 
                            type="text"
                            name="customerEmail"
                            value={details.customerEmail}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                    <input type="submit" value="Proceed"></input>
                </form>
            </div>
            <TableAdOrEdit 
                adEdit={adEdit}
                tableHeading={tableHeading}
            />
        </>
    )
};
export default AdOrderEditPage