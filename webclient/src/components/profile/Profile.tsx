import { Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, {useContext, useEffect, useState}from "react";
import { AuthContext } from "../services/auth-service";
import { Getter } from "../services/api-service";

export default function Profile(props:any) {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<any>({})
    const auth = useContext(AuthContext)
    useEffect(()=>{
        Getter("/user/"+auth.uid, (data)=>{
            setUser(data)
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <Toolbar/>
            <Container sx={{height:'100vh'}}>
                <Typography>{user.Username}</Typography>
            </Container>
        </div>
    )
}