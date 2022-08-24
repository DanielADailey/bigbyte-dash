import React from "react";
import { Card, CardContent} from "@mui/material";
import {
    Routes,
    Route,
  } from "react-router-dom";
import Profile from "../profile/Profile";
import TasksList from "../tasks/TasksList";
import Kanban from "../tasks/Kanban";

export default function DashboardMainContentArea(){
    return(
        <div style={{minWidth:'100%'}}>
            <Card sx={{flexGrow:1, m:0,p:0, alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                <CardContent sx={{flexGrow:1, m:0,p:0, alignContent:'center', justifyContent:'center', alignItems:'center'}}>
                <Routes>
                    <Route path="/" element={<TasksList/>}/>
                    <Route path="/profile/:id" element={<Profile/>}/>
                    <Route path="/kanban" element={<Kanban/>}/>
                </Routes>
                </CardContent>
            </Card>
        </div>
    )
}