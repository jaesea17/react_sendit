import { useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import TableOrderTrack from "../../components/tables/TableOrderTrack";
import Exit from "../../components/Exit";

const Track = () => {
    const [inputs, setInputs] = useState("");
    const [tableV, setTableV] = useState(""); 
    const [trackHistory, setTrackHistory] = useState(""); 
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

            setTableV(res.data);

        }).catch((err) => {
            console.log(err);
        })
    };

    const orderHistory = () => {
        let authToken = document.cookie;
        const payload = { 
            headers:{"Set-Cookie" : authToken }
        };
        axios.get('https://git.heroku.com/jsendit-api.git/inventory/orders',payload)
        .then((res) => { 
               
            setTrackHistory(res.data); 

        }).catch((err) => {
            console.log(err)
        })
    }; 

    return(
        <>
            <Header />
            <Exit />
            <div style={{marginBottom: "40px"}}>
                <h3>Please enter your tracking number</h3>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        name="trackNum"
                        value={inputs}
                        onChange={handleChange}
                    />
                    <input type="submit" />
                </form>

                <h3>Click button to view Order history</h3>
                <p>NB: take note(copy) of order number to be edited</p>
                <input type="button" value="view" onClick={orderHistory} />
            </div>
            <TableOrderTrack tableV={tableV} 
                trackHistory={trackHistory}
                tableHeading={tableHeading} 
            />
                
        </>
    )
};
export default Track