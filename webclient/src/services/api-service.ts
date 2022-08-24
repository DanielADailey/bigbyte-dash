import axios from "axios";
import React from "react";

const API_BASE = "http://localhost:3001"

export const Getter = (route:string, cb:(data:any)=>void) => {
    return axios.get(API_BASE+route, {withCredentials:true}).then(res => {
        cb(res.data)

    }).catch(err => {
        console.log(err)
    })
}

export const genericPost = (route:string, obj:any, cb:()=>void) => {
    return axios.post(API_BASE+route, obj, {withCredentials:true}).then(res => {
        console.log(res.data)
        cb()
    }).catch(err => {
        console.log(err)
    })
}