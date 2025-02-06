import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()
export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem('dentaluser')) || null)
    const [isReadNot,setIsReadNot]=useState(false)
    const updateUser = (data)=>{
        setCurrentUser(data)
    }
    const updateIsReadNot = (data)=>{
        setIsReadNot(data)
    }
    
  
    useEffect(()=>{
        localStorage.setItem('dentaluser',JSON.stringify(currentUser))
    },[currentUser])
 return (
    <AuthContext.Provider value={{currentUser,updateUser,isReadNot,updateIsReadNot}}>{children}</AuthContext.Provider>
 )
}

