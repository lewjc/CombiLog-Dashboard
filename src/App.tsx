import React, { useEffect, useState } from "react";
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
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuItem from "@material-ui/core/MenuItem";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import MessageIcon from "@material-ui/icons/Message";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArchiveIcon from "@material-ui/icons/Archive";
import Service from "./pages/Service";
import Badge from "@material-ui/core/Badge";
import RealtimeLogs from "./pages/RealtimeLogs";
import { BrowserRouter as Router } from "react-router-dom";
import Archive from "./pages/Archive";
import NotFound from "./pages/NotFound";
import Config from "./config";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Setting from "./pages/Setting";
import packageJson from "../package.json";
import APIRoutes from "./constants/APIRoutes";

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
    color: "rgb(54 54 54 / 87%)",
  },
  content: {
    flexGrow: 1,
    backgroundColor: "#f1f1f1",
    padding: theme.spacing(3),
    marginTop: "50px",
  },
  navLink: {
    color: "inherit",
    textDecoration: "none",
  },
  mainMast: {
    marginBottom: "20px",
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
  mastTitle: {
    paddingLeft: "20px",
  },
}));

const iconMap: any = {
  Dashboard: <DashboardIcon />,
  Services: <DeviceHubIcon />,
  Archive: <ArchiveIcon />,
  "Realtime Logs": <MessageIcon />,
  Settings: <SettingsApplicationsIcon />,
};

interface AppPropTypes {
  config: Config;
}

export default function App(props: AppPropTypes) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setOpen] = useState(false);
  const [nav, setNav] = useState(0);
  const [versions, setVersions] = useState({
    dashboard: packageJson.version,
    archiver: "~",
    aggregator: "~",
  });

  useEffect(() => {
    const services: any = {
      aggregator: {
        up: false,
        version: "",
      },
      archiver: {
        up: false,
        version: "",
      },
    };

    const fetchVersion = (api: string, route: string, service: any) => {
      return fetch(`${api}${route}`)
        .then((response: Response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            setTimeout(() => {
              fetchVersion(api, route, service);
            }, 5000);
            throw new Error(
              `Could not get ${api}${route}. Unreachable version. Attempting again in 5 seconds...`
            );
          }
        })
        .then((json) => {
          service.up = true;
          service.version = json.version;
        })
        .then(() => {
          if (services.aggregator.up && services.archiver.up) {
            const aggregatorVersion: any = services.aggregator.version;
            const archiverVersion: any = services.archiver.version;
            const discernedVersions = {
              aggregator: aggregatorVersion,
              archiver: archiverVersion,
            };

            setVersions({
              ...versions,
              ...discernedVersions,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    fetchVersion(
      props.config.archiveUrl,
      APIRoutes.archiver.VERSION,
      services.archiver
    );

    fetchVersion(
      props.config.aggregatorApiUrl,
      APIRoutes.aggregator.VERSION,
      services.aggregator
    );
  }, [versions, props.config]);

  if (!isMobile && isOpen) {
    setOpen(false);
  }

  const getMain = () => {
    switch (nav + 1) {
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

      case 4: {
        return <Setting config={props.config} />;
      }

      default:
        return <NotFound />;
    }
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar
            className={
              isMobile ? classes.toolbarCssMobile : classes.toolbarCssNoMobile
            }
          >
            {isMobile ? (
              <IconButton
                className={classes.menuIcon}
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpen(!isOpen)}
              >
                <MenuIcon />
              </IconButton>
            ) : null}
            <MenuItem>
              <IconButton
                aria-label="show 11 new notifications"
                color="inherit"
              >
                <Badge
                  badgeContent={11}
                  className={classes.notification}
                  color="primary"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              {isMobile ? null : <p>Notifications</p>}
            </MenuItem>
          </Toolbar>
        </AppBar>
        <Drawer
          open={isMobile ? isOpen : true}
          className={isMobile ? classes.mobile : classes.drawer}
          variant={isMobile ? "temporary" : "permanent"}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}>
            <div className={classes.toolbarMast}>
              <h2 className={classes.mastTitle}>CombiLog</h2>
              <Divider />
              <h5 className={classes.mastTitle}>
                Dashboard: v{versions.dashboard}
              </h5>
              <h5 className={classes.mastTitle}>
                Aggregator: v{versions.aggregator}
              </h5>
              <h5 className={classes.mastTitle}>
                Archive: v{versions.archiver}
              </h5>
            </div>
          </div>
          <Divider />
          <List>
            {["Services", "Realtime Logs", "Archive", "Settings"].map(
              (text, index) => (
                <ListItem
                  button
                  onClick={() => {
                    if (isMobile) {
                      setOpen(false);
                    }
                    setNav(index);
                  }}
                  key={text}
                >
                  <ListItemIcon>{iconMap[text]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          <NotificationContainer />
          <div className={classes.mainMast} />
          {getMain()}
        </main>
      </div>
    </Router>
  );
}
