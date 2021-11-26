import axios from "axios";
import { useState } from "react";
import Exit from "../../components/Exit";
import Header from "../../components/Header";
import TableOrderEdit from "../../components/tables/TableOrderEdit";

// let body = document.getElementById("divTable");
// let originalLength = body.children.length;

const OrderEditPage = () => {
    const [destnInput, setDestnInput] = useState({orderNumber:"",country:"", address:"", city:"", state:""});
    const [edits, setEdits] = useState(""); 
    const tableHeading = ["ORDER NUMBER","PACKAGE","WEIGHT",
    "COUNTRY FROM","ADDRESS FROM","CITY FROM",
    "STATE FROM","COUNTRY TO","ADDRESS TO",
    "CITY TO","STATE TO","STATUS","LOCATION","CUSTOMER ID","CUSTOMER EMAIL"];

    
    const handleChangeDestn = (e) => {
        setDestnInput({...destnInput, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let authToken = document.cookie;
        const {orderNumber, country, address, city, state} = destnInput;
        const payload = {          
            "tCountry":country, "tAddress":address,
            "tCity":city, "tState":state,"orderNumber":orderNumber,
            headers: {"Set-Cookie" : authToken}
       };      
       axios.put('https://jsendit-api.herokuapp.com/inventory/orders/:orderNumber',payload)
       .then((res) => {

        setEdits(res.data);
        
        
       }).catch((err) => {
            console.log(err)
       });
    }
    return(
        <>
            <Header />
            <Exit />
            <div style={{marginBottom:"50px"}}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Order Number:
                        <input 
                            type="text"
                            name="orderNumber"
                            value={destnInput.orderNumber}
                            onChange={handleChangeDestn}
                        />
                    </label>
                    <h3>Enter new destination details</h3>
                    <label>
                        Country:
                        <input 
                            type="text"
                            name="country"
                            value={destnInput.country}
                            onChange={handleChangeDestn}
                        />
                    </label>
                    <label>
                        Address:
                        <input 
                            type="text"
                            name="address"
                            value={destnInput.address}
                            onChange={handleChangeDestn}
                        />
                    </label>
                    <label>
                        City:
                        <input 
                            type="text"
                            name="city"
                            value={destnInput.city}
                            onChange={handleChangeDestn}
                        />
                    </label>
                    <label>
                        State:
                        <input 
                            type="text"
                            name="state"
                            value={destnInput.state}
                            onChange={handleChangeDestn}
                        />
                    </label>
                    <input type="submit" value="Proceed" />
                </form>
            </div>
            <TableOrderEdit 
                edits={edits}
                tableHeading={tableHeading}
            />
        </>
    )
};
export default OrderEditPage