import axios from "axios";
import { useState } from "react";
import ExitAdmin from "../../components/ExitAdmin";
import Header from "../../components/Header";
import TableAdOrderTrack from "../../components/tables/TableAdOrderTrack";


const AdminTrack = () => {
    const [inputs, setInputs] = useState("");
    const [adTrack, setAdTrack] = useState("");
    const [viewAll, setViewAll] = useState("");
    const tableHeading = ["ORDER NUMBER","PACKAGE","WEIGHT",
    "COUNTRY FROM","ADDRESS FROM","CITY FROM",
    "STATE FROM","COUNTRY TO","ADDRESS TO",
    "CITY TO","STATE TO","STATUS","LOCATION","CUSTOMER ID","CUSTOMER EMAIL"];


    const handleChange = (e) => {
        setInputs(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderNumber = inputs;
        axios.get(`http://localhost:3000/inventory/orders/${orderNumber}`)
        .then((res) => {
        
            setAdTrack(res.data);
            
        }).catch((err) => {
            console.log(err);
        })

    }

    const adViewAll = () => {
        let authToken = document.cookie;
        const payload = {
            headers: {"Set-Cookie" : authToken}
        }
        axios.get('https://git.heroku.com/jsendit-api.git/inventory/orders/admin',payload)
        .then((res) => {

        setViewAll(res.data)

        }).catch((err) => {
            console.log(err)
        })
    };
    return(
        <>
            <Header />
            <ExitAdmin />
            <div style={{marginBottom:"50px"}}>
                <h3>Please enter customer tracking number</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="trackNum"
                        value={inputs}
                        onChange={handleChange}
                    />
                    <input type="submit" value="track" />
                </form>
               
                <p>click to view all orders</p>
                <input type="button" value="view" onClick={adViewAll} />
            </div>    
            <TableAdOrderTrack  
                adTrack={adTrack}
                viewAll={viewAll}
                tableHeading={tableHeading}
            />       
        </>
    )
};
export default AdminTrack