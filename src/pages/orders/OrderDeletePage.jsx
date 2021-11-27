import axios from "axios";
import { useState, useEffect } from "react";
import Exit from "../../components/Exit";
import Header from "../../components/Header";

const OrderDeletePage = () => {
    const [inputs, setInputs] = useState("");
    const [deleted, setDeleted] = useState("");
    const [visible, setVisible] = useState(false)

    const handleChange = (e) => {
        setInputs(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderNumber = inputs;
        let authToken = localStorage.getItem("auth_token");

        const payload ={
            data: {"orderNumber": orderNumber}
        };
        console.log("payload:", payload);

         //adding token to an instance of axios
         const authAxios = axios.create({
            headers:{
                Authorization: authToken
            }
        });

        authAxios.delete('https://jsendit-api.herokuapp.com/inventory/orders',payload)
        .then((res) => {        
            setDeleted(res.data);
        }).catch((err) => {
            console.log(err)
        })       
    };
    // setting effects to hide and display message
    useEffect(() => {
        if(deleted){
            setVisible(true)
        }
    },[deleted]);

    useEffect(() => {
        setVisible(false)
    },[]);

    return(
        <>
            <Header />
            <Exit />
            <div>
                <form onSubmit={handleSubmit}> 
                    <label>
                        Order number:
                        <input 
                            type="text"
                            name="order"
                            value={inputs}
                            onChange={handleChange}
                        />
                    </label> 
                    <input type="submit" value="Delete" />           
                </form>
                {visible && <p>order has been deleted successfully</p>}
            </div>
        </>
    )
};
export default OrderDeletePage