import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import React, {useState} from "react";
import { genericPost } from "../services/api-service";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function TasksList(){
    const [open, setOpen] = useState<boolean>(false)
    const [values, setValues] = useState<any>({})
    const handleTaskClick = () => {
        setOpen(true)
    }
    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSave = () => {
        genericPost("/task", values, ()=>{
           setOpen(false)
        })
    }
    return(
        <div>
            <Button onClick={handleTaskClick}>Add Task</Button>
            <Typography>Task list</Typography>

            <Dialog open={open} fullWidth={true} maxWidth="lg">
                <DialogTitle>
                <TextField sx={{ mb: 1 }} fullWidth label="title" id="fullWidth" onChange={handleChange("title")} />
                </DialogTitle>
                <DialogContent>
                <TextField sx={{ mb: 1 }} fullWidth label="description" id="fullWidth" onChange={handleChange("description")}
                     multiline
                    rows={4}/>
                    <Calendar/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={()=>{setOpen(false)}}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}