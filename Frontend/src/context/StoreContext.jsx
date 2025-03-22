import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = 'http://localhost:5000/api'
    const [token,setToken] = useState(localStorage.getItem('token'))

    const contextValue = {
        url,
        token
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
