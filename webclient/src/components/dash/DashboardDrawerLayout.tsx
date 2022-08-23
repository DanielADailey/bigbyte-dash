import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardAppBar from './DashboardAppBar'
import DashboardMainContentArea from './DashboardMainContentArea';
import { useNavigate } from 'react-router';

const drawerWidth = 240;

export default function DashboardDrawerLayout() {

  const DrawerRoutes = [
    {
      human_readable: "Browse Games",
      nav_route: ""
    },
    {
      human_readable: "Add Game",
      nav_route: "games/add"
    },
    {
      human_readable: "Profile",
      nav_route: "profile"
    }
  ]

  const nav = useNavigate()

  const handleDrawerClick = (route:any) => {
    console.log(route)
    nav(route, {replace:false})
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DashboardAppBar drawerWidth={drawerWidth} />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {DrawerRoutes.map((route, index) => (
            <ListItem key={route.human_readable} disablePadding>
              <ListItemButton onClick={()=>handleDrawerClick(route.nav_route)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={route.human_readable} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <DashboardMainContentArea/>
      </Box>
    </Box>
  );
}