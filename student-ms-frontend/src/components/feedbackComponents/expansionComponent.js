import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

//Custom Components
import AddUser from '../adminPanel/accounts/addUser'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 10
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export default function DetailedExpansionPanel(props) {
    const classes = useStyles();

    if(props.value ) {
    return (

            <div className={classes.root}>
                <ExpansionPanel defaultExpanded={false} >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>{props.heading}</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>{props.subHeading}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        {props.component === 'addUser' ? <AddUser />
                        : props.component === 'addCourse' ? 'Course Component here'
                            : 'Error Loading Component'}
                    </ExpansionPanelDetails>
                    <Divider/>
                    <ExpansionPanelActions>
                        <Typography className={classes.secondaryHeading}>Being editted by {props.name}</Typography>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
    );
} else {
        return(
            <div>
                <Typography>
                    Error Occured.
                </Typography>
            </div>
        )
    }
}
