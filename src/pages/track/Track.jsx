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

        axios.get(`https://jsendit-api.herokuapp.com/inventory/orders/${orderNumber}`)
        .then((res) => {
            if(res.data.length === 0) return alert("no data"); 
            setTableV(res.data);
        }).catch((err) => {
            console.log(err);
        })
    };

    const orderHistory = () => {
        let authToken = localStorage.getItem("auth_token");

         //adding token to an instance of axios
         const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });

        authAxios.get('https://jsendit-api.herokuapp.com/inventory/orders')
        .then((res) => {
            if(res.data.length === 0) return alert("no data"); 
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