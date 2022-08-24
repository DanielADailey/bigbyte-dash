/**
 * This represents some generic auth provider API, like Firebase.
 */
 import axios from "axios";
import React, { createContext, FC, useState } from "react";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:3001/login"
const AUTH_URL = "http://localhost:3001/auth"
const REGISTER_URL = "http://localhost:3001/user"
 
 interface AuthContextType {
   uid:number;
   login: (uname: string, pword: string, cb:(uid:any)=>void) => void
   logout: () => void
   register:(obj:any, cb:VoidFunction) => void
  }
  
  export const AuthContext = createContext<AuthContextType>(
    null!
  );

  export function AuthProvider({children}: {children: React.ReactNode;}) {
    let [uid, setUid] = React.useState<number>(0);
    const nav = useNavigate()
    if (uid == 0) {
      axios.get(AUTH_URL, {withCredentials: true}).then(res =>{
        console.log(res.data)
        if(res.data.id){
          setUid(res.data.id)
          nav("/v1")
        }
      }).catch(err => {
        console.log(err)
      })
    }
    let login = (uname: string, password: string, cb:(uid:any)=>void) => {
      let pkt = {"uname":uname, "pword":password}
      axios.post(API_URL, pkt, { withCredentials: true }).then(res => {
        if(res.data.id){
          setUid(res.data.id)
          cb(res.data)
        }
      })
    }
    let logout = () => {
      setUid(0)
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      nav("/")
      return authProviderService.logout
    }
    let register = (obj:any, cb:VoidFunction) => {
      return authProviderService.register(obj, cb)
    }
    let value = {uid, login, logout, register}
    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
 }

 const authProviderService = {
  isAuthenticated: false,
  login(pkt:any, cb:(uid:any)=>void) {
    axios.post(API_URL, pkt, { withCredentials: true }).then(res => {
      if(res.data.id){
        cb(res.data)
      }
      cb("")
    }).catch(err => {
      console.log(err)
      cb("")
    })
    cb("")
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