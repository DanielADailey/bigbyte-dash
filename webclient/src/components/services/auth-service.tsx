/**
 * This represents some generic auth provider API, like Firebase.
 */
 import axios from "axios";
import React, { createContext, FC, useState } from "react";

const API_URL = "http://localhost:3001/auth"
const REGISTER_URL = "http://localhost:3001/user"
 
 interface AuthContextType {
   uid:number;
   login: (uname: string, pword: string, cb:VoidFunction) => void
   logout: () => void
   register:(obj:any, cb:VoidFunction) => void
  }
  
  export const AuthContext = createContext<AuthContextType>(
    null!
  );

  export function AuthProvider({children}: {children: React.ReactNode;}) {
    let [uid, setUid] = React.useState<number>(0);
    let login = (uname: string, password: string, cb:VoidFunction) => {
      let pkt = {"uname":uname, "pword":password}
      setUid(1)
      return authProviderService.login(pkt, cb)
    }
    let logout = () => {
      setUid(0)
      return authProviderService.logout
    }
    let register = (obj:any, cb:VoidFunction) => {
      setUid(1)
      return authProviderService.register(obj, cb)
    }
    let value = {uid, login, logout, register}
    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
 }

 const authProviderService = {
  isAuthenticated: false,
  login(pkt:any, cb:VoidFunction) {
    axios.post(API_URL, pkt).then(res => {
      console.log(res)

      cb()
    }).catch(err => {
      console.log(err)
    })
  },
  logout(){
    console.log("logout")
  },
  register(obj:any, cb:VoidFunction){
    console.log(obj)
    axios.post(REGISTER_URL, obj).then(res => {
      console.log(res)
      cb()
    }).catch(err => {
      console.log(err)
    })
  }
 }

 function useAuth() {
  return React.useContext(AuthContext);
}