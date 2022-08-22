import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Tasks } from '../tools/tasks/Tasks'
export default function DashboardMainContentArea(){
    return(
        <div style={{minWidth:'100%'}}>
            <Box sx={{
                display:'flex',
                direction: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: '75%'
            }}>
            <Card>
                <CardContent sx={{minWidth:'75%'}}>
                    <Tasks/>
                </CardContent>
            </Card>
            </Box>
        </div>
    )
}