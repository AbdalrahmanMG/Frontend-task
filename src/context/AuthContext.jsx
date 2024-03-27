import React, { createContext, useState } from 'react'

export const authContext = createContext()

export default function AuthContextProvider({children}) {
    const [token, setToken]= useState(null)

    const logout =()=>{
        setToken(null)
        localStorage.removeItem('token')
    }
 
    return (
    <authContext.Provider value={{token, setToken, logout}} >
        {children}
    </authContext.Provider>
  )
}
