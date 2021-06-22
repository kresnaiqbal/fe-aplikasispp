import React, { useState, useRef} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from 'clsx';
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import { BarChart2 } from 'react-feather';
import   DashboardView   from '../container/Dashboard';
// import { requestLogout } from '../../API/Login/Logout';
import logosmwhite from '../image/logosmwhite.png';
import green from "@material-ui/core/colors/green";
import Paper from "@material-ui/core/Paper";
import { BorderColor } from "@material-ui/icons";
import {
	Dashboard, People, ListAlt, MenuBook, Settings, ExitToApp, Computer, Assessment, Speed, Person, ExpandMore, ExpandLess
	, Timeline, NetworkCheck, Dns, WifiTethering, SettingsInputAntenna
} from '@material-ui/icons';
import RiwayatTransaksi from "../container/RiwayatTransaksi";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: '#FFFFFF',
  },
  customHeight: {
    minHeight: 200
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
    hide: {
      display: 'none',
    },
    iconColor: {
      color: '#fff',
    },
    menuButton: {
      margin: '0 auto',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      background: 'linear-gradient(to bottom, #3B945E, #5BA578)',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      background: 'linear-gradient(to bottom, #3B945E, #5BA578)',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: '52px',
      [theme.breakpoints.up('sm')]: {
        width: '52px',
      },
      
    },
    NavPaper:{
      color: '#fff',
      width: '220px',
      height: '100px',
      marginLeft: '10px',
    },
    menuprofile: {
      marginLeft: theme.spacing(2),
    },
    titleSubCategory: {
      fontSize: '15px',
      fontWeight: "Medium",
      color: '#fff'
    },
    avatarSmall: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    logoutBtn: {
      padding: 0,
      margin: 0,
      textTransform: "none",
      justifyContent: "left",
      background: "#00000000",
      '&:hover': {
        background: "#00000000",
      },
    },
    NavText: {
      fontFamily: 'Roboto',
      fontWeight: 700,

    },
    offset: theme.mixins.toolbar
  }));

  
  
  const Navbar = () => {  
	  const logoutRef = useRef()
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open21, setOpen21] = React.useState(false);
    const [open22, setOpen22] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [example, setExample] = useState("secondary");
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
      setOpen21(false);
      setOpen22(false);
      setOpen2(false);
    };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const openAccountPage = () => {
      setAnchorEl(null);
    };  
    // const handleLogout = () => {
    //   requestLogout(history)
    // }
    
  
    const expandMenuOpen1 = () => {
      setOpen21(!open21);
      setOpen22(false);
      setOpen2(false);
      setOpen(true);
    };
    const expandMenuOpen2 = () => {
      setOpen22(!open22);
      setOpen21(false);
      setOpen2(false);
      setOpen(true);
    };
    
    const expandMenuOpen = () => {
      setOpen2(!open2);
      setOpen22(false);
      setOpen21(false);
      setOpen(true);
    };

    // let division = user.division.sub_division.title;
    // let user = JSON.parse(sessionStorage.getItem("user"))
    // let firstName = user.firstname
    
    return (
      <React.Fragment>
        <AppBar
          color={isCustomColor || isCustomHeight ? "secondary" : example}
          className={`${isCustomColor && classes.customColor} ${
            isCustomHeight && classes.customHeight
          }`}
        >
          <Toolbar>
					<div style={{ flexGrow: 1 }}></div>
					<Person />
					<Typography variant="subtitle1"></Typography>
					<Button
						className={classes.menuprofile}
						size="small"
						startIcon={<Avatar className={classes.avatarSmall}>U</Avatar>}
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleClick}>
						{/* {firstName} */}
						<ExpandMore />
					</Button>
					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem>
							<Button component={Link} to={process.env.PUBLIC_URL + "/home/profile"} className={classes.logoutBtn} onClick={openAccountPage}>
								My Account
							</Button>
						</MenuItem>
						<MenuItem>
							<Button 
                component={Link} to={process.env.PUBLIC_URL + "/"} 
                className={classes.logoutBtn} 
                // onClick={handleLogout} ref={logoutRef}
                >
								Signout
							</Button>
						</MenuItem>
					</Menu>
          </Toolbar>
            <Drawer 
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}>
              <div className={classes.toolbar}>
              <div style={{ flexGrow: 1 }} className={clsx(classes.menuButton, { [classes.hide]: !open })}>
                <img src={logosmwhite} alt="images logo navbar in drawer" style={{ height: '30px', float: 'left'}} />
            </div>
                  <IconButton onClick={handleDrawerClose} className={clsx(classes.menuButton, { [classes.hide]: !open })}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <BarChart2 style={{ transform: 'rotate(270deg)', color: '#fff' }} />}
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon style={{ color: '#fff' }} />
                  </IconButton>
                  </div>
                  <Divider />
          <List>
            
              <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                <ListItem button>
                  <ListItemIcon><Dashboard className={classes.iconColor} /></ListItemIcon>
                  <ListItemText primary="Dashboard" className={classes.NavText} style={{ color: '#fff', fontSize: "12px" }} />
                </ListItem>
              </Link>
              <Link button onClick={expandMenuOpen}>
                <ListItem button>
                  <ListItemIcon><Person className={classes.iconColor} /></ListItemIcon>
                  <ListItemText primary="Santri" style={{ color: '#fff', fontSize: "12px" }} />
                  {open2 ? <ExpandLess style={{ color: "#fff" }} /> : <ExpandMore style={{ color: "#fff" }} />}
							</ListItem>
							<Collapse in={open2} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
                <Paper className={classes.NavPaper}>
                <Link to={`${process.env.PUBLIC_URL}/DaftarSantri`}>
                  <ListItemText primary="Daftar Santri" className={classes.NavText} style={{ color: '#000', fontSize: "12px" }} />
                </Link>
                <Link to={`${process.env.PUBLIC_URL}/AkunSantri`}>
                  <ListItemText primary="Akun Santri" style={{ color: '#000', fontSize: "12px" }} />
                </Link>
                </Paper>
								</List>
							</Collapse>
              </Link>

              <Link to={`${process.env.PUBLIC_URL}/akunoperator`}>
                <ListItem button>
                  <ListItemIcon><People className={classes.iconColor} /></ListItemIcon>
                  <ListItemText primary="Operator" style={{ color: '#fff', fontSize: "12px" }} />
							</ListItem>
				    	</Link>

              <Link button onClick={expandMenuOpen1}>
                <ListItem button>
                  <ListItemIcon><ListAlt className={classes.iconColor} /></ListItemIcon>
                  <ListItemText primary="Transaksi" style={{ color: '#fff', fontSize: "12px" }} />
                  {open21 ? <ExpandLess style={{ color: "#fff" }} /> : <ExpandMore style={{ color: "#fff" }} />}
                </ListItem>
                <Collapse in={open21} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper className={classes.NavPaper}>
                  <Link to={`${process.env.PUBLIC_URL}/inputSPP`}>
                    <ListItemText primary="Input SPP" style={{ color: '#000', fontSize: "12px" }} />
                  </Link>
                  <Link to={`${process.env.PUBLIC_URL}/RiwayatTransaksi`}>
                    <ListItemText primary="Riwayat Transaksi" style={{ color: '#000', fontSize: "12px" }} />
                  </Link>
                  </Paper>
								</List>
							</Collapse>
              </Link>
              <Link button onClick={expandMenuOpen2}>
                <ListItem button>
                  <ListItemIcon><MenuBook className={classes.iconColor} /></ListItemIcon>
                  <ListItemText primary="Laporan" style={{ color: '#fff', fontSize: "12px" }} />
                  {open22 ? <ExpandLess style={{ color: "#fff" }} /> : <ExpandMore style={{ color: "#fff" }} />}
                </ListItem>
                <Collapse in={open22} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                  <Paper className={classes.NavPaper}>
                    <Link to={`${process.env.PUBLIC_URL}/LaporanKeuangan`}>
                      <ListItemText primary="Laporan Keuangan" style={{ color: '#000', fontSize: "12px"}} />
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/LaporanTunggakan`}>
                      <ListItemText primary="Laporan Tunggakan" style={{ color: '#000', fontSize: "12px", marginTop: "10px" }} />
                    </Link>  
                  </Paper>          
                  </List>
							</Collapse>
              </Link>
              <Link to={`${process.env.PUBLIC_URL}/pengaturan`}>
                <ListItem button>
                  <ListItemIcon><Settings className={classes.iconColor} /></ListItemIcon>
                  <ListItemText primary="Pengaturan" style={{ color: '#fff', fontSize: "12px" }} />
                </ListItem>
              </Link>
              {/* <Link to={`${process.env.PUBLIC_URL}`}>
                <ListItem button>
                  <ListItemIcon><ExitToApp className={classes.iconColor} /></ListItemIcon>
                  <ListItemText primary="Log out" style={{ color: '#fff', fontSize: "12px" }} />
                </ListItem>
              </Link> */}
            
              
          </List>
          </Drawer>
        </AppBar>
        <Toolbar />
        {/* <RiwayatTransaksi/> */}
        <main className={classes.content}>
				<div className={classes.toolbar} />
				<Switch>
					<Route exact path={`${process.env.PUBLIC_URL}/home`} component={DashboardView} />
          <Route exact path={`${process.env.PUBLIC_URL}/home/riwayattransaksi`} component={RiwayatTransaksi}
					/>
				</Switch>
			</main>
      </React.Fragment>
    );
  }

  function generateMenus(group) {
    let menus = []
    for (let i = 0; i < group.length; i++) {
      menus.push(generateMenu(group[i]))
    }
    return menus
  }

  function generateMenu(item) {
    let link = process.env.PUBLIC_URL + item.link.replace("pmt-cmt", "home")
    link = link.replace(".html", "")
    return (
      <Link to={link}>
        <ListItem button>
          <ListItemText primary={item.menu_name} style={{ color: "#fff", fontSize: "12px" }} />
        </ListItem>
      </Link>
    )
  }
  
  
export default Navbar;