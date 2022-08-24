import {Select, MenuItem, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Popover, Grid, FormControl, InputLabel } from "@mui/material";
import React, { useContext, useState } from "react";
import { genericPost, Getter } from "../../services/api-service";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from "src/services/auth-service";

export default function TasksList() {
    const [open, setOpen] = useState<boolean>(false)
    const [values, setValues] = useState<any>({})
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, onChange] = useState(new Date());
    const [assignedUser, setAssignedUser] = React.useState(1);
    const [users, setUsers] = useState<any>({})
    const handleTaskClick = () => {
        setOpen(true)
    }
    const handleChange = (prop: any) => (event: any) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSave = () => {
        genericPost("/task", values, () => {
            setOpen(false)
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
        Getter("/admin", (data)=>{
            setUsers(data)
        })
    }
   
    const auth = useContext(AuthContext)

  const handleSelect = (event) => {
    console.log(event)
    setAssignedUser(event.target.value);
  };
    const startOpen = Boolean(anchorEl);
    return (
        <div>
            <Button onClick={handleTaskClick}>Add Task</Button>
            <Typography>Task list</Typography>

            <Dialog open={open} fullWidth maxWidth="lg">
                <DialogTitle>
                    <TextField sx={{ mb: 1 }} fullWidth label="title" onChange={handleChange("title")} />
                </DialogTitle>
                <DialogContent>
                    <Grid>

                    </Grid>
                    <TextField sx={{ mb: 1 }} fullWidth label="description" onChange={handleChange("description")}
                        multiline
                        rows={4} />
                    <Button onClick={handlePopoverOpen}><Typography>Start Date</Typography></Button>
                    <Popover
                        open={startOpen}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                        <Calendar onChange={onDateChange} value={value} />
                    </Popover>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Assign</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={assignedUser}
                        value={assignedUser}
                        label="Assign"
                        onOpen={getUsers}
                        onChange={handleSelect}
                    >  
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={auth.uid}>Me</MenuItem>
                    {
                        users != null && users.length>0 ? 
                        users.map((user) => (
                            auth.uid != user.ID ?
                            <MenuItem key={user.ID} value={`${user.ID}`}>{user.Username}</MenuItem> : null
                            )) : <MenuItem value={"1"}></MenuItem>
                        } 
                    </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={() => { setOpen(false) }}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const renderMenuItem = (value: number) => {
    return (
      <MenuItem key={value} value={value}>
        <Typography>{value}</Typography>
      </MenuItem>
    );
  };