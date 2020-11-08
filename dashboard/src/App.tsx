import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Dashboard from "./pages/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import MessageIcon from "@material-ui/icons/Message";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ArchiveIcon from "@material-ui/icons/Archive";
import MailIcon from "@material-ui/icons/Mail";
import Service from "./pages/Service";
import Badge from "@material-ui/core/Badge";
import RealtimeLogs from "./pages/RealtimeLogs";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Archive from "./pages/Archive";
import NotFound from "./pages/NotFound";
import Config from "./config";
<<<<<<< HEAD
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
=======
>>>>>>> feature/initial-dashboard

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},

	appBar: {
		width: "100%",
		zIndex: 2000,
		background:
			"linear-gradient(90deg, rgb(68 90 212) 0%, rgba(56,71,154,1) 41%, rgba(63,81,181,1) 100%)",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		top: 60,
		backgroundColor: "#f1f1f1",
		boxShadow:
			"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	toolbarMast: {
		paddingLeft: "20px",
		color: "rgb(54 54 54 / 87%)",
	},
	content: {
		flexGrow: 1,
		backgroundColor: "#f1f1f1",
		padding: theme.spacing(3),
	},
	navLink: {
		color: "inherit",
		textDecoration: "none",
	},
	mobile: {},
	toolbarCssNoMobile: {
		justifyContent: "flex-end",
	},
	toolbarCssMobile: {
		justifyContent: "flex-end",
	},
	menuIcon: {
		position: "absolute",
		left: "22px",
	},
	notification: {
		"& span": {
			backgroundColor: "#dc9b49",
		},
	},
}));

const iconMap: any = {
	Dashboard: <DashboardIcon />,
	Services: <SettingsApplicationsIcon />,
	Archive: <ArchiveIcon />,
	"Realtime Logs": <MessageIcon />,
};

interface AppPropTypes {
	config: Config;
}

export default function App(props: AppPropTypes) {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const [isOpen, setOpen] = useState(false);
<<<<<<< HEAD
	const [nav, setNav] = useState(0);
=======
>>>>>>> feature/initial-dashboard
	if (!matches && isOpen) {
		setOpen(false);
	}

<<<<<<< HEAD
	const getMain = () => {
		switch (nav) {
			case 0: {
				return <Dashboard />;
			}
			case 1: {
				return <Service config={props.config} />;
			}

			case 2: {
				return <RealtimeLogs config={props.config} />;
			}
			case 3: {
				return <Archive config={props.config} />;
			}

			default:
				return <NotFound />;
		}
	};

=======
>>>>>>> feature/initial-dashboard
	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar className={matches ? classes.toolbarCssMobile : classes.toolbarCssNoMobile}>
						{matches ? (
							<IconButton
								className={classes.menuIcon}
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={() => setOpen(!isOpen)}>
								<MenuIcon />
							</IconButton>
						) : null}
						<MenuItem>
							<IconButton aria-label="show 11 new notifications" color="inherit">
								<Badge badgeContent={11} className={classes.notification} color="primary">
									<NotificationsIcon />
								</Badge>
							</IconButton>
							{matches ? null : <p>Notifications</p>}
						</MenuItem>
						<MenuItem>
							<IconButton
								aria-label="account of current user"
								aria-controls="primary-search-account-menu"
								aria-haspopup="true"
								color="inherit">
								<AccountCircle />
							</IconButton>
							{matches ? null : <p>Profile</p>}{" "}
						</MenuItem>
					</Toolbar>
				</AppBar>
				<Drawer
					open={matches ? isOpen : true}
					className={matches ? classes.mobile : classes.drawer}
					variant={matches ? "temporary" : "permanent"}
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor="left">
					<div className={classes.toolbar}>
						<div className={classes.toolbarMast}>
							<h2>CombiLog</h2>
							<h4>v0.1.0</h4>
						</div>
					</div>
					<Divider />
					<List>
						{["Dashboard", "Services", "Realtime Logs", "Archive"].map((text, index) => (
<<<<<<< HEAD
							<ListItem
								button
								onClick={() => {
									if (matches) {
										setOpen(false);
									}
									setNav(index);
								}}
								key={text}>
								<ListItemIcon>{iconMap[text]}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
=======
							<Link className={classes.navLink} to={`/Combilog/${text.replace(" ", "")}`}>
								<ListItem
									button
									onClick={() => {
										if (matches) {
											setOpen(false);
										}
									}}
									key={text}>
									<ListItemIcon>{iconMap[text]}</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							</Link>
>>>>>>> feature/initial-dashboard
						))}
					</List>
				</Drawer>
				<main className={classes.content}>
<<<<<<< HEAD
					<NotificationContainer />
					<div className={classes.toolbar} />
					{getMain()}
=======
					<div className={classes.toolbar} />
					<Switch>
						<Route path="/Combilog/Dashboard">
							<Dashboard />
						</Route>
						<Route path="/Combilog/Services">
							<Service config={props.config} />
						</Route>
						<Route path="/Combilog/RealtimeLogs">
							<RealtimeLogs config={props.config} />
						</Route>
						<Route path="/Combilog/Archive">
							<Archive config={props.config} />
						</Route>
						<Route component={NotFound} /> {/* The Default not found component */}
					</Switch>
>>>>>>> feature/initial-dashboard
				</main>
			</div>
		</Router>
	);
}
