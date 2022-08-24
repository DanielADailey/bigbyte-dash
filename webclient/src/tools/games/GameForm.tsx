import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import Uploader from "../util/Uploader";
import { genericPost } from "../../services/api-service";
import SyncLoader from "react-spinners/SyncLoader";
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded'

export default function GameForm(): JSX.Element {
    const [values, setValues] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const handleFormSubmit = () => {
        setLoading((true))
        console.log(values)
        genericPost("/games", values, (): void => {
            setValues({})
            setIsSuccess(true)
            setLoading(false)
        })

    }
    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    return (
        <div>
            <TextField fullWidth name="title" placeholder="Title" onChange={handleChange("title")} value={values["title"]} />
            <TextField fullWidth name="description" placeholder="Description" onChange={handleChange("description")} value={values["description"]} />
            <Uploader />
            {
                loading ? 
                 <SyncLoader color="white" /> :
                 <Button onClick={handleFormSubmit}>Submit</Button>
            }
        </div>
    )
}