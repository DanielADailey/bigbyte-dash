import React, {useState} from "react";
import {Dialog, DialogTitle, DialogContent, Select, MenuItem, Typography, Button,
    DialogActions, TextField, Popover, Grid, FormControl, InputLabel,} from '@mui/material'
import { Getter } from "src/services/api-service";
import { genericPost } from "src/services/api-service";
import { useContext } from "react";
import { AuthContext } from "src/services/auth-service";

export default function AddTaskDialog(props){
    const [values, setValues] = useState<any>({
        "assigned_to": 0,
        "status": 0,
        "priority": 2,
        "group": 0
    })
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, onChange] = useState(new Date());
    const [users, setUsers] = useState([])

    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSave = () => {
        setValues({ ...values, ["created_by"]:auth.uid});
        genericPost("/tasks", values, () => {
            props.setOpen(false)
            Getter("/tasks", (data) => {
                console.log(data)
                props.setTasks(data)
            })
        })
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const onDateChange = (date) => {
        handleClose()
        onChange(date)
    }
    const getUsers = () => {
        Getter("/admin", (data) => {
            props.setUsers(data)
        })
    }

    const auth = useContext(AuthContext)
    const startOpen = Boolean(anchorEl);
    return(
        <Dialog open={props.open} fullWidth maxWidth="lg">
                <DialogTitle>
                    <TextField sx={{ mb: 2 }} fullWidth label="title" onChange={handleChange("title")} />
                </DialogTitle>
                <DialogContent sx={{ p: 2 }}>
                    <TextField sx={{ mb: 2 }} fullWidth label="Description" onChange={handleChange("description")}
                        multiline
                        rows={6} />
                    {/* <Button onClick={handlePopoverOpen}><Typography>Start Date</Typography></Button>
                    <Popover
                        open={startOpen}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                        <Calendar onChange={onDateChange} value={value} />
                    </Popover> */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="demo-simple-select-label">Assign</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={assignedUser}
                            value={values["assigned_to"]}
                            label="Assign"
                            onOpen={getUsers}
                            onChange={handleChange("assigned_to")}>
                            <MenuItem value={0}>None</MenuItem>
                            <MenuItem value={auth.uid}>Me</MenuItem>
                            {
                                users != null && users.length > 0 ?
                                    users.map((user:any) => (
                                        auth.uid != user.ID ?
                                            <MenuItem key={user.ID} value={`${user.ID}`}>{user.Username}</MenuItem> : null
                                    )) : <MenuItem></MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={values.status}
                            label="Status"
                            onChange={handleChange("status")}>
                            <MenuItem value={0}>Waiting</MenuItem>
                            <MenuItem value={1}>In Progress</MenuItem>
                            <MenuItem value={2}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Add To Group</InputLabel>
                        <Select
                            value={values.group}
                            label="Add To Group"
                            onChange={handleChange("group")}>
                            <MenuItem value={0}>None</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={values.priority}
                            label="Priority"
                            onChange={handleChange("priority")}>
                            <MenuItem value={0}>Lowest</MenuItem>
                            <MenuItem value={1}>Low</MenuItem>
                            <MenuItem value={2}>Normal</MenuItem>
                            <MenuItem value={3}>High</MenuItem>
                            <MenuItem value={4}>Highest</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={() => { props.setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
    )
}