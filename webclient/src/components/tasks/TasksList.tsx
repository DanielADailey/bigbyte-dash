import { Button, Table, TableContainer, TableRow, TableCell, 
    FormControl, Select, MenuItem, InputLabel, TableHead, TableBody, 
    Paper, AppBar, Toolbar, Box} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { genericPost, Getter } from "../../services/api-service";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { AuthContext } from "src/services/auth-service";
import AddTaskDialog from "./AddTaskDialog";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function TasksList() {
    const [open, setOpen] = useState<boolean>(false)    
    const [tasks, setTasks] = useState([])
    const handleTaskClick = () => {
        setOpen(true)
    }
    useEffect(()=>{
        Getter("/tasks", (data) => {
            console.log(data)
            setTasks(data)
        })
    },[])
    const handleStatus = (event) => {
        console.log(event)
        let endpoint = "/tasks" + "/" + event.target.name + "/" + event.target.value
        Getter(endpoint, (data)=>{
            Getter("/tasks", (data) => {
                console.log(data)
                setTasks(data)
            })
        })
    }
    
    return (
        <div>
            <Toolbar>
                <Box sx={{
                    display: 'flex'
                }}>

            <Button onClick={handleTaskClick}>Add Task</Button>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
                </Box>

            </Toolbar>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Assigned To</TableCell>
                            <TableCell align="right">Created By</TableCell>
                            <TableCell align="right">Priority</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {  tasks != null ? 
                        tasks.length > 0 ?
                        tasks.map((task:any) => (
                            <TableRow
                                key={task.ID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >   
                                <TableCell>{task.ID}</TableCell>
                                <TableCell align="right">{task.Title}</TableCell>
                                <TableCell align="right">{task.AssignedTo}</TableCell>
                                <TableCell align="right">{task.CreatedBy}</TableCell>
                                <TableCell align="right">{task.Priority}</TableCell>
                                <TableCell align="right">
                                    <FormControl>
                                        <InputLabel>Status</InputLabel>
                                        <Select
                                            value={task.Status}
                                            label="Status"
                                            name={task.ID.toString()}
                                            onChange={handleStatus}>
                                            <MenuItem value={0}>Waiting</MenuItem>
                                            <MenuItem value={1}>In Progress</MenuItem>
                                            <MenuItem value={2}>Done</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                            </TableRow>
                        )) : <div></div>
                       : <div></div>
                      }
                        
                    </TableBody>
                </Table>
            </TableContainer>
            <AddTaskDialog open={open} setOpen={setOpen} setTasks={setTasks}/>
        </div>
    )
}
