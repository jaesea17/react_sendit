import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Quote = () => {
    const [inputs, setInputs] = useState("document");
    const [inputs2, setInputs2] = useState("");
    
    
    const handleChangeRadio = (e) => {
        setInputs(e.target.value)
    };
    
    const handleChangeWeight = (e) => {
        setInputs2(e.target.value)
    };

    const quoteFunction = (e) =>{ 
        e.preventDefault();
        let item = inputs;
        let weight = inputs2;
       //validation 
       if(parseInt(weight) === 0 || weight === "" || isNaN(weight)){
            document.getElementById("quote").style.color = 'red';
            document.getElementById("quote").innerHTML = `enter valid inputs in all fields..!`
            return     
        }
        let newWeight = parseInt(weight);
        document.getElementById("quote").style.color = 'green';
        document.getElementById("quote").innerHTML = `${item}; costs ₦${newWeight*5000}, arrives in 5 working days`;
    };

    return(
        <>
            <Header />
            <div>
                <h2>I am shipping..</h2>
                <form onSubmit={quoteFunction}>
                    <label>
                        <input 
                            type="radio" 
                            name="inputs"
                            value="document" 
                            onChange={handleChangeRadio}
                            checked={inputs === "document"}
                            required={true}
                        />
                        Document
                    </label>
                    <label></label>
                    <input 
                        type="radio" 
                        name="inputs"
                        value="parcel"
                        onChange={handleChangeRadio}
                        checked={inputs === "parcel"}
                    />
                    Parcel
                    <label></label>
                    <input
                         type="radio" 
                         name="inputs" 
                         value="cargo"
                         onChange={handleChangeRadio}
                         checked={inputs === "cargo"}
                    />
                    CargoI(above 30kg)
                    <h2>it weighs..</h2>
                    <label>
                        weight(Kg):
                        <input 
                            type="number" 
                            name="weight"
                            value={inputs2} 
                            onChange={handleChangeWeight}
                        />
                    </label>
                    <input type="submit" />
                    <p id="quote"></p>
                    <button><Link to="/orders" style={{textDecoration: "none", color: "black"}}>Create Order</Link></button>
            
                </form>

            </div>
        </>
    )
};
export default Quote