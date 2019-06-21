import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import * as ReactDOM from "react-dom";


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 5 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },

}));

export default function NavTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }
    buttonClick(){
        ReactDOM.render(<studentHome/>, document.getElementById('root'));
    }

    return (
        <div className={classes.root}>

            {/*<AppBar style={{width:'1700px', height:'50px', marginTop:'70px', backgroundColor:'#c1c7c9', color:'#000000'}}>*/}
                {/*<Tabs variant="fullWidth" value={value} onChange={handleChange}>*/}
                    {/*<LinkTab label="Home" href="/components/students/studentHome" />*/}
                    {/*<LinkTab label="Courses" href="/trash" />*/}
                    {/*<LinkTab label="My courses" href="/spam" />*/}
                    {/*<LinkTab label="Notifications" href="/drafts"/>*/}
                    {/*<LinkTab label="Settings" href="/drafts"/>*/}
                {/*</Tabs>*/}
            {/*</AppBar>-*/}

            {/*{value === 0 && <TabContainer>Home</TabContainer>}*/}
            {/*{value === 1 && <TabContainer>Courses</TabContainer>}*/}
            {/*{value === 2 && <TabContainer>My courses</TabContainer>}*/}
            {/*{value === 3 && <TabContainer>Notifications</TabContainer>}*/}
            {/*{value === 4 && <TabContainer>Settings</TabContainer>}*/}

            <AppBar position="static" >
                <Tabs variant="fullWidth" value={value} onChange={handleChange} >
                    <LinkTab label="Page One" href="/drafts" />
                    <LinkTab label="Page Two" href="/trash" />
                    <LinkTab label="Page Three" href="/spam" />
                </Tabs>

            {value === 0 && <TabContainer style={{marginTop:650}}>Page One</TabContainer>}
            {value === 1 && <TabContainer>Page Two</TabContainer>}
            {value === 2 && <TabContainer>Page Three</TabContainer>}

            </AppBar>
        </div>

    );
}
