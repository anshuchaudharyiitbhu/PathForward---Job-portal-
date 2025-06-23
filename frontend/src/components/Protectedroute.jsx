import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "./context/context"


const Protected=({children})=>{
    const {user}=useContext(UserContext);
    const navigate=useNavigate();
    useEffect(() => {
        if(user===null||user.role!=="recruiter")
       { navigate("/")
     }
    }, [user,navigate])
    

    return(
        <>
      {  children}
        </>
     
    )
}
export default Protected;