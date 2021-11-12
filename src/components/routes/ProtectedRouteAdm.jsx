import { Route, Redirect } from "react-router-dom";

const ProtectedRouteAdm = ({ auth, component: Component, ...rest}) => {
    return( <Route {...rest} 
                render={
                    (props) => {
                        return (
                                auth ? ( <Component {...props}/>) 
                                : ( <Redirect to={{pathname: '/admin', 
                                    state: {from: props.location}}} /> )                            
                            )
                    }
                }
            
            /> )
};
export default ProtectedRouteAdm;