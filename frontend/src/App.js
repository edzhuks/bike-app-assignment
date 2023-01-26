import './App.css';
import React, {Component, useState} from 'react';
import JourneyList from './components/JourneyList';
import StationList from "./components/StationList";
import {
    Badge,
    Box,
    Container,
    createTheme,
    Divider,
    styled,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    Toolbar,
    Typography,
    AppBar as MuiAppBar,
    Drawer as MuiDrawer
} from "@mui/material";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, Outlet} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    '& .MuiDrawer-paper': {
        position: 'relative', whiteSpace: 'nowrap', width: drawerWidth, transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
        }), boxSizing: 'border-box', ...(!open && {
            overflowX: 'hidden', transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
            }), width: theme.spacing(7), [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}),);

const drawerWidth = 240;
const theme = createTheme()

const App = () => {

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (


        <ThemeProvider theme={theme}>

            <Box sx={{display: 'flex'}}>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px', ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            Helsinki Bike dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List>
                        <ListItem key={"Journeys"} disablePadding component={Link}
                                  to={"journeys?page=0&itemsPerPage=30&sortField=duration&sortOrder=asc"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <DirectionsBikeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Journeys"}/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={"Stations"} disablePadding component={Link}
                                  to={"/stations?page=0&itemsPerPage=30&sortField=capacity&sortOrder=asc"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <WarehouseIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Stations"}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="xxlg" sx={{mt: 4, mb: 2}}>
                    {/*<Container>*/}
                    <Outlet>

                        </Outlet>
                    </Container>

                </Box>
            </Box></ThemeProvider>);

}

export default App;

