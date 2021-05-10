import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { AccountBox, Apps, Assessment, Assignment, Contacts, Settings } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export function SliderDrawer(props) {

  const [active, setActive] = React.useState(0)

  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerClose = () => {
    props.handleDrawerClose()
  };

  const handleClick = (index,path) =>{
    setActive(index)
    props.history.push(path)
  }

  return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav">
          {[
            {text: 'Dashboard', icon: <Apps />, path:"/"}, 
            {text: 'Your Contacts',icon: <Contacts />, path:"/allcontacts"},
            {text: 'Order List', icon: <Assignment />, path:"/order"}].map((data, index) => (
            <ListItem selected={active === index} button key={index} onClick={()=> handleClick(index, data.path)}>
              <ListItemIcon>{data.icon}</ListItemIcon>
              <ListItemText primary={data.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List component="nav">
          {['Account', 'Settings'].map((text, index) => ( 
            <ListItem selected={active === index+3} button key={index+3} onClick={()=> setActive(index+3) }>
              <ListItemIcon>{index % 2 === 0 ? <AccountBox /> : <Settings />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
  );
}

export default withRouter(SliderDrawer)