import './App.css';
import {useState} from 'react';
import {
    Box,
    Container,
    createTheme,
    Divider,
    styled,
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
    Drawer as MuiDrawer, CssBaseline
} from "@mui/material";
import WarehouseIcon from '@mui/icons-material/Warehouse';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, Outlet, Navigate, useOutlet} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {yellow} from "@mui/material/colors";
import {Upload} from "@mui/icons-material";


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

const drawerWidth = 180;
const theme = createTheme({palette:{primary:{main:yellow[700]}}})

const App = () => {

    const outlet = useOutlet()

    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
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
                        <ListItem key={"Upload"} disablePadding component={Link}
                                  to={"/upload"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Upload/>
                                </ListItemIcon>
                                <ListItemText primary={"Upload data"}/>
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
                        {outlet ?
                            <Outlet/>
                            :
                            <Navigate to={"journeys?page=0&itemsPerPage=30&sortField=duration&sortOrder=asc"}/>
                        }
                    </Container>

                </Box>
            </Box>
        </ThemeProvider>
    );

}

export default App;

