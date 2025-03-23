import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const url = 'http://localhost:5000/api'
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [matches, setMatches] = useState([])
    const [colorTheme, setColorTheme] = useState('light')
    const [userInfo, setUserInfo] = useState({})
    const [userRoomInfo, setUserRoomInfo] = useState()

    const userInfoFunction = async () => {
        try {
            const response = await axios.get(url + "/user/info", { headers: { token } })
            if (response.data.success) {
                setUserInfo(response.data.userInfo)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userRoomInfoFunction = async () => {
        try {
            const response = await axios.get(url + "/dormroom/find-user-room", {headers: {token}})

            if(response.data.success){
                setUserRoomInfo(response.data.room)
                console.log(response.data.room)
            }
            else{
                console.log('Error occured')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userInfoFunction()
        userRoomInfoFunction()
    }, [token])

    const contextValue = {
        url,
        token,
        matches,
        setMatches,
        colorTheme,
        setColorTheme,
        userInfo,
        userRoomInfo
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
