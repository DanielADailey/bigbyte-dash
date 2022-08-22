import React, {useState} from "react";
import Box from '@mui/material/Box'
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from 'axios'
import { minWidth } from "@mui/system";
import {AuthContext} from "../services/auth-service";
import SyncLoader from 'react-spinners/SyncLoader'
import { useNavigate } from "react-router";

export default function Auth() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    let navigate = useNavigate()

    const auth = React.useContext(AuthContext);

    const handleSubmit = () => {
        setLoading(true)
        let cp = {uname: username, pword:password}
        auth.login(cp.uname, cp.pword, ()=>{
            navigate("/", { replace: true });
        })
    }

    return(
        <div style={{height:'100vh'}}>
            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:"center",
                alignItems:"center",
                minHeight:'100vh',
                minWidth: '50%'
            }}>
                {loading ? 
                    <SyncLoader/>
                :
                <Card sx={{
                    maxWidth:'50%'
                }}>
                    <CardContent>
                        <Typography variant="h3" style={{ fontFamily: 'Playfair-Display', color: 'black' }} sx={{mb:1}}>Login</Typography>
                        <TextField sx={{mb:1}} fullWidth label="username" id="fullWidth" onChange={(e)=>{setUsername(e.target.value)}}/>
                        <TextField fullWidth label="password" id="fullWidth" onChange={(e)=>{setPassword(e.target.value)}}/>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </CardContent>  
                </Card>
                }
                
            </Box>
        </div>
    )
}