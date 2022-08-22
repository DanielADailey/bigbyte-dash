import { Box } from "@mui/system";
import React, {useState} from "react";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import axios from 'axios'

export default function Login() {
    const [pkt, setPkt] = useState({})

    const handleOnChange = event => {
        const { name, value } = event.target;
        setPkt({ ...pkt, [name]: value });
      };

    const submit = () => {
        console.log(pkt)
        axios.post("http://localhost:3001/auth/", pkt).then((res) => {
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return(
        <div>
            <Box>
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
                <Button onClick={submit}>Login</Button>
            </Box>
        </div>
    )
}