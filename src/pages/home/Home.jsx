import { Route, Switch } from "react-router-dom";
import Activities from "../../components/Activities.jsx";
import Header from "../../components/Header.jsx";
import Navbar from "../../components/Navbar.jsx";
import Main from "../../components/Main.jsx";
import AdminSignin from "../admin/AdminSignin.jsx";
import Signin from "../user/Signin.jsx"; 
import Signup from "../user/Signup.jsx";
import Contact from "../contact/Contact.jsx";
import About from "../about/About.jsx";
import Error from "../Error.jsx";
import Quote from "../quote/Quote.jsx";
import Orders from "../orders/Orders.jsx";
import OrdersPage3 from "../orders/OrdersPage3.jsx";
import AdOrderEditPage from "../orders/AdOrderEditPage.jsx";
import OrderDeletePage from "../orders/OrderDeletePage.jsx";
import OrderEditPage from "../orders/OrderEditPage.jsx";
import StatusAndLocation from "../orders/StatusAndLocation.jsx";
import Track from "../track/Track.jsx";
import AdminTrack from "../track/AdminTrack.jsx";
import AdminSignup from "../admin/AdminSignup.jsx";
import ProtectedRoute from "../../components/routes/ProtectedRoute.jsx";
//import { login } from "../../components/reusables/login.js";
import { useState, useEffect } from "react";
import { auth } from "../../components/util/auth.js";
import { UserContext } from "../../useContext.js";
import { Signout } from "../user/Signout.jsx";
import { AdminSignout } from "../admin/AdminSignout.jsx";
import ProtectedRouteAdm from "../../components/routes/ProtectedRouteAdm.jsx";
import { authAd } from "../../components/util/authAd.js";

const Home = () => {
    let [isAuth, setIsAuth] = useState(false);
    console.log("authH:",isAuth);
    useEffect(()=>{
        auth()
        setIsAuth(auth)
    },[isAuth]);

    let [adAuth, setAdAuth] = useState(false);
    console.log("authAdH:",adAuth);
    useEffect(()=>{
        authAd()
        setAdAuth(authAd)
    },[adAuth]);
    
    return(

        <Switch>
            <Route exact path='/'>
                <div>
                    <Header />
                    <Navbar />
                    <Activities />
                    <Main />                
                </div>
            </Route>

            <Route path='/signin'> 
                <UserContext.Provider value={[isAuth, setIsAuth]}>
                    <Signin />
                </UserContext.Provider>
            </Route>

            <Route path='/signout'> 
                <UserContext.Provider value={[isAuth, setIsAuth]}>
                    <Signout />
                </UserContext.Provider>
            </Route>

            <Route path='/signup'>
                <Signup />
            </Route>

            <Route path='/contact'>
                <Contact />
            </Route>

            <Route path='/about'>
                <About />
            </Route>

            <Route exact path='/admin'>
                <UserContext.Provider value={[adAuth, setAdAuth]}>
                    <AdminSignin />
                </UserContext.Provider>
            </Route>

            <Route path='/admin/admin_signup'>
                <AdminSignup />
            </Route>

            <Route path='/admin/admin_signout'> 
                <UserContext.Provider value={[adAuth, setAdAuth]}>
                    <AdminSignout />
                </UserContext.Provider>
            </Route>
           
            {/* <Route path='/admin/admin_track'>
                <AdminTrack />
            </Route> */}

            <ProtectedRouteAdm path='/admin/admin_track' auth={adAuth} component={AdminTrack}/>


            {/* <Route path='/admin/ad_order_edit_page'>
                <AdOrderEditPage />
            </Route> */}

            <ProtectedRouteAdm path='/admin/ad_order_edit_page' auth={isAuth} component={AdOrderEditPage}/>


            {/* <Route path='/admin/status_and_location'>
                <StatusAndLocation />
            </Route> */}

            <ProtectedRouteAdm path='/admin/status_and_location' auth={isAuth} component={StatusAndLocation}/>


            <Route path='/quote'>
                <Quote />
            </Route>

            {/* <Route exact path='/orders'>
                <Orders />
            </Route> */}

            <ProtectedRoute path='/orders' auth={isAuth} component={Orders}/>


            {/* <Route path='/orders/orders_page3'>
                <OrdersPage3 />
            </Route> */}

            <ProtectedRoute path='/orders/orders_page3' auth={isAuth} component={OrdersPage3}/>


            {/* <Route path='/orders/orders_delete_page'>
                <OrderDeletePage />
            </Route> */}
            
            <ProtectedRoute path='/orders_delete_page' auth={isAuth} component={OrderDeletePage}/>


            {/* <Route path='/orders/orders_edit_page'>
                <OrderEditPage />
            </Route> */}
            <ProtectedRoute path='/orders/orders_edit_page' auth={isAuth} component={OrderEditPage}/>
 
            <ProtectedRoute path='/track' auth={isAuth} component={Track}/> 

            <Route >
                <Error />
            </Route>


        </Switch>
    )
};
export default Home
