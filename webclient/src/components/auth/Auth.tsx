import React, { useState } from "react";
import Box from '@mui/material/Box'
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import axios from 'axios'
import { minWidth } from "@mui/system";
import { AuthContext } from "../services/auth-service";
import SyncLoader from 'react-spinners/SyncLoader'
import { useNavigate } from "react-router";

export default function Auth() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [values, setValues] = useState({})
    const [isRegister, setIsRegister] = useState<boolean>(false)
    let navigate = useNavigate()

    const auth = React.useContext(AuthContext);

    const handleSubmit = () => {
        setLoading(true)
        let cp = { uname: username, pword: password }
        if (isRegister) {
            auth.register(values, () => {
                setLoading(false);
                navigate("/v1", { replace: true });
            })
            return
        }
        auth.login(cp.uname, cp.pword, () => {
            setLoading(false);
            navigate("/v1", { replace: true });
        })
    }

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleRegister = (isReg: boolean) => {
        setIsRegister(isReg)
    }


    return (
        <div style={{ height: '100vh', backgroundColor: 'black' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: '100vh',
                    minWidth: '50%'
                }}>
                {loading ?
                    <SyncLoader color="white" />
                    :
                    <Card sx={{
                        maxWidth: '50%'
                    }}>
                        <CardContent>
                            {
                                !isRegister ?
                                    <div>
                                        <Typography variant="h3" style={{ fontFamily: 'Playfair-Display', color: 'white' }} sx={{ mb: 1 }}>Login</Typography>
                                        <TextField sx={{ mb: 1 }} fullWidth label="username" id="fullWidth" onChange={(e) => { setUsername(e.target.value) }} />
                                        <TextField sx={{ mb: 1 }} fullWidth label="password" id="fullWidth" onChange={(e) => { setPassword(e.target.value) }} type="password" autoComplete="current-password" />
                                        <Typography onClick={() => { handleRegister(true) }}>No account? Click here to register.</Typography>
                                    </div> :
                                    <div>
                                        <Typography variant="h3" style={{ fontFamily: 'Playfair-Display', color: 'white' }} sx={{ mb: 1 }}>Register</Typography>
                                        <TextField sx={{ mb: 1 }} fullWidth label="username" id="fullWidth" onChange={handleChange("uname")} />
                                        <TextField sx={{ mb: 1 }} fullWidth label="password" id="fullWidth" onChange={handleChange("pword")} type="password"/>
                                        <TextField sx={{ mb: 1 }} fullWidth label="first name" id="fullWidth" onChange={handleChange("fname")} />
                                        <TextField sx={{ mb: 1 }} fullWidth label="last name" id="fullWidth" onChange={handleChange("lname")} />
                                        <TextField sx={{ mb: 1 }} fullWidth label="email" id="fullWidth" onChange={handleChange("email")} />
                                        <TextField sx={{ mb: 1 }} fullWidth label="age" id="fullWidth" onChange={handleChange("age")} />
                                        <Typography onClick={() => { handleRegister(false) }}>Already have an account? Click here to login.</Typography>
                                    </div>
                            }
                            <Button onClick={handleSubmit}>Submit</Button>
                        </CardContent>
                    </Card>
                }

            </Box>
        </div>
    )
}