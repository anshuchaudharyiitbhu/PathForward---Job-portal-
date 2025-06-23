import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./context/context"


const Protectedauth=({children})=>{
    const {user}=useContext(UserContext);
    const navigate=useNavigate();
    useEffect(() => {
        if(user)
       { navigate("/")
     }
    }, [user,navigate])
    

    return(
        <>
      { children}
        </>
     
    )
}
export default Protectedauth;