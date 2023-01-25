import './App.css';
import React, {Component} from 'react';
import JourneyList from './components/JourneyList';
import StationList from "./components/StationList";
import {
    Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography
} from "@mui/material";
import {Link, Outlet} from "react-router-dom";

const drawerWidth = 200;

const App = () => {

    return (<Box sx={{display: 'flex'}}>
        <Drawer
            sx={{
                width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': {
                    width: drawerWidth, boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Helsinki bikes
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                <ListItem key={"Journeys"} disablePadding component={Link}
                          to={"journeys?page=0&itemsPerPage=20&sortField=duration&sortOrder=asc"}>
                    <ListItemButton>
                        <ListItemText primary={"Journeys"}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={"Stations"} disablePadding component={Link}
                          to={"/stations?page=0&itemsPerPage=20&sortField=capacity&sortOrder=asc"}>
                    <ListItemButton>
                        <ListItemText primary={"Stations"}/>
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider/>

        </Drawer>
        <Box
            component="main"
            sx={{flexGrow: 1, bgcolor: 'background.default', p: 0}}
        >
            <Outlet>

            </Outlet>
        </Box>
    </Box>);

}

export default App;

