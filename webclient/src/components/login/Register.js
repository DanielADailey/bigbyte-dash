import React, { useState } from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import axios from 'axios'

export default function Login() {
    const [confirmPassword, setConfirmPassword] = useState("")
    const [pkt, setPkt] = useState({})

    const handleOnChange = event => {
        const { name, value } = event.target;
        setPkt({ ...pkt, [name]: value });
      };

    const submit = () => {
        console.log(pkt)
        if (pkt["pword"] !== confirmPassword){
            console.log("bad")
            return
        }
        axios.post("http://localhost:3001/user/", pkt).then((res) => {
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Username
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="uname"
                        onChange={handleOnChange}
                    />

                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Password
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="pword"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Confirm Password
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        First Name
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="fname"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Last Name
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="lname"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Age
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="age"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Email
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="email"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Phone Number
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        name="phone"
                        onChange={handleOnChange}
                    />
                </FormControl>
                <Button onClick={submit}>Submit</Button>
            </Box>
        </div>
    )
}