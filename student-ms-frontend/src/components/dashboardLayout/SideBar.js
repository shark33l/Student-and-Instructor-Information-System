import React, {Fragment} from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

//Import Custom Components
import SnackBarComponent from '../feedbackComponents/SnackBarComponent'

//Material UI Components
import {
    AppBar,
    CssBaseline,
    Divider,
    Drawer,
    Hidden,
    Toolbar,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Menu, MenuItem,

} from '@material-ui/core';

//Material UI Icons
import {
    Dashboard,
    LibraryBooks as Courses,
    Poll as Exams,
    School as Students,
    Person as Lecturers,
    Info as AboutIcon,
    MenuOutlined, LocalLibrary, AccountCircle
} from '@material-ui/icons';

//Material UI Styles
import {
    makeStyles,
    useTheme
} from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginBottom: 50,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function SideBar(props) {
    const { container } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    //Success Message on Login
    const [stateChange, setStateChange] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    //User Name & Type
    const [userName, setUserName] = useState("");
    const [userLevel, setuserLevel] = useState(0);
    const [userType, setUserType] = useState("");

    //Success Message
    const [successMessage, setSuccessMessage] = useState("Something is not right")

    useEffect(() => {

        console.log(props)

        if(props.authentified.auth){

            setUserName(props.userDetails.firstName + " " + props.userDetails.lastName);
            setuserLevel(props.userDetails.userLevel);

            if(userLevel === 1){
                setUserType("Admin")
            } else if (userLevel === 2){
                setUserType("Teacher")
            } else if (userLevel === 3){
                setUserType("Student")
            }
            setSuccessMessage(userType + " logged in as " + userName);
            setSuccess(true);

        }

    })


    function handleAuth(event) {
        // fetch('http://localhost:5000/rest/api/users/logout')
        //     .then(response =>{
        //         return response.json()
        //     }).then(json =>{
        //         console.log(json)
        // })

        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('email');
        setAuth(false);
        props.removeAuth();



        setAnchorEl(null);
    }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {['Dashboard', 'Courses', 'Exams', 'Lecturers', 'Students'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{ text === 'Dashboard' ? <Dashboard /> :
                                        text === 'Courses' ? <Courses /> :
                                        text === 'Exams' ? <Exams /> :
                                            text === 'Lecturers' ? <Link to='/lecturer/add'><Lecturers/></Link> :
                                        <Students />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['About'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon><AboutIcon /></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            {userType === "" ? <Fragment />
                : success? <SnackBarComponent value={true} message={successMessage} type="success" stateChange={true}/>
                : <SnackBarComponent value={false} />}
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuOutlined />
                    </IconButton>
                    <LocalLibrary style={{marginRight: 15}}/>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Hogwarts School of Witchcraft
                    </Typography>
                    {!auth && (
                        <Typography style={{marginRight: 15}} onClick={handleAuth}>
                            Login
                        </Typography>
                    )}
                    {auth && (
                        <div>
                            <IconButton
                                aria-label="Account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleAuth}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="Mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

SideBar.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};