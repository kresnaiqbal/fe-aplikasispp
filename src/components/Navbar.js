import React, { useState, useRef } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { BarChart2 } from "react-feather";
import DashboardView from "../container/Dashboard";
// import { requestLogout } from '../../API/Login/Logout';
import logosmwhite from "../image/logosmwhite.png";
import Paper from "@material-ui/core/Paper";
import {
  Dashboard,
  People,
  ListAlt,
  MenuBook,
  Person,
  Notifications,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import RiwayatTransaksi from "../container/RiwayatTransaksi";
import moment from "moment";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: "#FFFFFF",
  },
  customHeight: {
    minHeight: 200,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  hide: {
    display: "none",
  },
  iconColor: {
    color: "#fff",
  },
  menuButton: {
    margin: "0 auto",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    background: "linear-gradient(to bottom, #3B945E, #5BA578)",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "linear-gradient(to bottom, #3B945E, #5BA578)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: "52px",
    [theme.breakpoints.up("sm")]: {
      width: "52px",
    },
  },
  NavPaper: {
    color: "#fff",
    width: "220px",
    height: "100px",
    marginLeft: "10px",
  },
  NavPaper: {
    color: "#fff",
    width: "220px",
    height: "100px",
    marginLeft: "10px",
  },
  NavPaperLong: {
    color: "#fff",
    width: "220px",
    height: "160px",
    marginLeft: "10px",
  },
  menuprofile: {
    marginLeft: theme.spacing(2),
  },
  titleSubCategory: {
    fontSize: "15px",
    fontWeight: "Medium",
    color: "#fff",
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
    "&:hover": {
      background: "#00000000",
    },
  },
  NavText: {
    fontFamily: "Roboto",
    fontWeight: 700,
  },
  DropdownText: {
    paddingTop: "15px",
    paddingLeft: "25px",
    color: "#000",
    fontSize: "12px",
  },
  offset: theme.mixins.toolbar,
}));

const Navbar = () => {
  const logoutRef = useRef();
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

  let namaAdmin = sessionStorage.getItem("nama_admin").substring(1,sessionStorage.getItem("nama_admin").length-1);

  let permission = sessionStorage.getItem("permission");

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

  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <React.Fragment>
      <AppBar
        color={isCustomColor || isCustomHeight ? "secondary" : example}
        className={`${isCustomColor && classes.customColor} ${
          isCustomHeight && classes.customHeight
        }`}
      >
        <Toolbar>
          <Typography style={{ marginLeft: 40 }}>
            {moment().format("D MMMM, YYYY")}
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Link>
            <Notifications style={{ color: "black" }} />
          </Link>
          <Typography style={{ marginLeft: 10, marginRight: 2 }}>
            {namaAdmin}
          </Typography>
          <Button
            className={classes.menuprofile}
            size="small"
            startIcon={
              <Avatar className={classes.avatarSmall}>
                <Person />
              </Avatar>
            }
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
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
              <Button
                component={Link}
                to={process.env.PUBLIC_URL + "/home/profile"}
                className={classes.logoutBtn}
                onClick={openAccountPage}
              >
                My Account
              </Button>
            </MenuItem>
            <MenuItem>
              <Link to="">
                <Button className={classes.logoutBtn} onClick={handleLogout}>
                  Signout
                </Button>
              </Link>
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
          }}
        >
          <div className={classes.toolbar}>
            <div
              style={{ flexGrow: 1 }}
              className={clsx(classes.menuButton, { [classes.hide]: !open })}
            >
              <img
                src={logosmwhite}
                alt="images logo navbar in drawer"
                style={{ height: "30px", float: "left" }}
              />
            </div>
            <IconButton
              onClick={handleDrawerClose}
              className={clsx(classes.menuButton, { [classes.hide]: !open })}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <BarChart2
                  style={{ transform: "rotate(270deg)", color: "#fff" }}
                />
              )}
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
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
          </div>
          <Divider />
          <List>
            {permission && permission.includes("dashboard") && (
              <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                <ListItem button>
                  <ListItemIcon>
                    <Dashboard className={classes.iconColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    className={classes.NavText}
                    style={{ color: "#fff", fontSize: "12px" }}
                  />
                </ListItem>
              </Link>
            )}
            {permission && permission.includes("santri") && (
              <Link to={`${process.env.PUBLIC_URL}/DaftarSantri`}>
                <ListItem button>
                  <ListItemIcon>
                    <Person className={classes.iconColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Santri"
                    style={{ color: "#fff", fontSize: "12px" }}
                  />
                </ListItem>
              </Link>
            )}
            {permission && permission.includes("admin") && (
              <Link to={`${process.env.PUBLIC_URL}/akunadmin`}>
                <ListItem button>
                  <ListItemIcon>
                    <People className={classes.iconColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Admin"
                    style={{ color: "#fff", fontSize: "12px" }}
                  />
                </ListItem>
              </Link>
            )}
            {permission && (
              <Link button onClick={expandMenuOpen1}>
                <ListItem button>
                  <ListItemIcon>
                    <ListAlt className={classes.iconColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Transaksi"
                    style={{ color: "#fff", fontSize: "12px" }}
                  />
                  {open21 ? (
                    <ExpandLess style={{ color: "#fff" }} />
                  ) : (
                    <ExpandMore style={{ color: "#fff" }} />
                  )}
                </ListItem>
                <Collapse in={open21} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper className={classes.NavPaperLong}>
                      {permission.includes("input_transaksi") && (
                        <Link to={`${process.env.PUBLIC_URL}/inputSPP`}>
                          <ListItemText
                            primary="Pembayaran SPP Tunai"
                            className={classes.DropdownText}
                          />
                        </Link>
                      )}
                      {permission.includes("riwayat_transaksi") && (
                        <Link to={`${process.env.PUBLIC_URL}/ApprovalTransfer`}>
                          <ListItemText
                            primary="Approval Transfer"
                            className={classes.DropdownText}
                          />
                        </Link>
                      )}
                      {permission.includes("riwayat_transaksi") && (
                        <Link to={`${process.env.PUBLIC_URL}/RiwayatTransaksi`}>
                          <ListItemText
                            primary="Riwayat Transaksi"
                            className={classes.DropdownText}
                          />
                        </Link>
                      )}
                      {permission.includes("riwayat_transaksi") && (
                        <Link to={`${process.env.PUBLIC_URL}/UbahNominalSPP`}>
                          <ListItemText
                            primary="Ubah Nominal SPP"
                            className={classes.DropdownText}
                          />
                        </Link>
                      )}
                    </Paper>
                  </List>
                </Collapse>
              </Link>
            )}
            {permission && permission.includes("laporan") && (
              <Link button onClick={expandMenuOpen2}>
                <ListItem button>
                  <ListItemIcon>
                    <MenuBook className={classes.iconColor} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Laporan"
                    style={{ color: "#fff", fontSize: "12px" }}
                  />
                  {open22 ? (
                    <ExpandLess style={{ color: "#fff" }} />
                  ) : (
                    <ExpandMore style={{ color: "#fff" }} />
                  )}
                </ListItem>
                <Collapse in={open22} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper className={classes.NavPaper}>
                      <Link to={`${process.env.PUBLIC_URL}/LaporanKeuangan`}>
                        <ListItemText
                          primary="Laporan Keuangan"
                          className={classes.DropdownText}
                        />
                      </Link>
                      <Link to={`${process.env.PUBLIC_URL}/LaporanTunggakan`}>
                        <ListItemText
                          primary="Laporan Tunggakan"
                          className={classes.DropdownText}
                        />
                      </Link>
                    </Paper>
                  </List>
                </Collapse>
              </Link>
            )}
          </List>
        </Drawer>
      </AppBar>
      <Toolbar />
      {/* <RiwayatTransaksi/> */}
      <main className={classes.content}>
        <div className={classes.toolbar} style={{ paddingLeft: 10 }} />
      </main>
    </React.Fragment>
  );
};

function generateMenus(group) {
  let menus = [];
  for (let i = 0; i < group.length; i++) {
    menus.push(generateMenu(group[i]));
  }
  return menus;
}

function generateMenu(item) {
  let link = process.env.PUBLIC_URL + item.link.replace("pmt-cmt", "home");
  link = link.replace(".html", "");
  return (
    <Link to={link}>
      <ListItem button>
        <ListItemText
          primary={item.menu_name}
          style={{ color: "#fff", fontSize: "12px" }}
        />
      </ListItem>
    </Link>
  );
}

export default Navbar;