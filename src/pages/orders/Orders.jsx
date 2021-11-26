import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Exit from "../../components/Exit";
import Header from "../../components/Header";

const Orders = () => {
    const[item, setItem] = useState("cargo");
    const[weight, setWeight] = useState("");
    const[details, setDetails] = useState({
        fCountry: "", fAddress: "", fCity: "", fState: "",
        tCountry: "", tAddress: "", tCity: "", tState: ""
    });
    
    let history = useHistory();
    
    const handleChangeDetails = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setDetails({...details, [name]: value});
    };

    const handleChangeInputs = (e) =>{
        setItem(e.target.value);
    };
    
    const handleChangeWeight = (e) =>{
        setWeight(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let authToken = localStorage.getItem("auth_token");
        const {
            fCountry, fAddress, fCity,fState, 
            tCountry, tAddress, tCity, tState 
        } = details;     
        
        const payload ={
            "item": item, "weigth": parseInt(weight),
            "fCountry": fCountry, "fAddress": fAddress,
            "fCity": fCity, "fState": fState, 
            "tCountry": tCountry, "tAddress": tAddress,
            "tCity": tCity, "tState": tState,
            headers: {"Authorization" : authToken}
        };
        console.log("payload:", payload);
        axios.post('https://jsendit-api.herokuapp.com/inventory/orders',payload)
        .then((res) => {
            console.log("res:", res);
            if(res.status === 200){
                history.push("/orders/orders_page3");                            
            }
            
        }).catch((err) => {
            console.log(err);
        })
        
    };

    return(
        <>
            <Header />
            <Exit />
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <select value={item} onChange={handleChangeInputs}>
                            <option value="cargo">Cargo(above 30kg)</option>
                            <option value="document">Document</option>
                            <option value="parcel">Parcel</option>
                        </select>
                    </label>

                    <h2>it weighs..</h2>
                    <label>
                       weight(KG):
                       <input 
                            type="text"
                            name="weight"
                            value={weight}
                            onChange={handleChangeWeight}
                            required={true}
                       /> 
                       <p id="note"></p>
                    </label>

                    {/* create order form  */}
                    <h3>FROM</h3>
                    <label>
                        Country:
                        <input 
                            name="fCountry"
                            value={details.fCountry}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>
                    <label>
                        Address:
                        <input 
                            name="fAddress"
                            value={details.fAddress}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>
                    <label>
                        City:
                        <input 
                            name="fCity"
                            value={details.fCity}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>
                    <label>
                        State:
                        <input 
                            name="fState"
                            value={details.fState}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>

                   
                    <h3>TO</h3>
                    <label>
                        Country:
                        <input 
                            name="tCountry"
                            value={details.tCountry}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>
                    <label>
                        Address:
                        <input 
                            name="tAddress"
                            value={details.tAddress}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>
                    <label>
                        City:
                        <input 
                            name="tCity"
                            value={details.tCity}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>
                    <label>
                        State:
                        <input 
                            name="tState"
                            value={details.tState}
                            onChange={handleChangeDetails}
                            required={true}
                        />                        
                    </label>

                    <input style={{display: "block", marginTop: '30px'}} type="submit" value="Proceed"/>
                </form>
            </div>
        </>
    )
};
export default Orders