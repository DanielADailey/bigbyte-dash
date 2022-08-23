import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Tasks } from '../tools/tasks/Tasks'
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
  } from "react-router-dom";
import AddGame from "./games/AddGame";
import Profile from "../profile/Profile";
import ExpandedGameView from "./games/ExpandedGameView";
import GameBrowser from "./games/GameBrowser";
import TasksList from "../tasks/TasksList";
export default function DashboardMainContentArea(){
    const nav = useNavigate()
    const navToSubroute = () => {
        nav("games", {replace:false})
    }
    return(
        <div style={{minWidth:'100%'}}>
            <Card sx={{flexGrow:1, m:0,p:0, alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                <CardContent sx={{flexGrow:1, m:0,p:0, alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                <Routes>
                    <Route path="/" element={<GameBrowser/>}/>
                    <Route path="/games/add" element={<AddGame/>}/>
                    <Route path="/games/view/:id" element={<ExpandedGameView />} />
                    <Route path="/profile/:id" element={<Profile/>}/>
                    <Route path="/tasks" element={<TasksList/>}/>
                </Routes>
                </CardContent>
            </Card>
        </div>
    )
}