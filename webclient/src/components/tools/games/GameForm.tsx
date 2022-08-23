import { Button, TextField } from "@mui/material";
import React, {useContext, useState} from "react";
import Uploader from "../util/Uploader";
import { genericPost } from "src/components/services/api-service";

export default function GameForm():JSX.Element{
    const [values, setValues] = useState<any>()

    const handleFormSubmit = () => {
        console.log(values)
        genericPost("/games", values)
    }

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    return(
    <div>
        <TextField fullWidth name="title" placeholder="Title" onChange={handleChange("title")}/>
        <TextField fullWidth name="description" placeholder="Description" onChange={handleChange("description")}/>
        <Uploader/>
        <Button onClick={handleFormSubmit}>Submit</Button>
    </div>
    )
}