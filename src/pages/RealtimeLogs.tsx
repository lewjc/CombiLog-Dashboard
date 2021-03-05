import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { ColourRule, LazyLog } from "react-combilazylog";
import Config from "../config";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { getColourRules } from "../util/requestUtil";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    serviceStatus: {
      marginLeft: 15,
    },
    table: {
      minWidth: 650,
    },

    blue: {
      backgroundColor: "#3f51b5",
      borderRadius: "4px",
      color: "white",
      padding: "0 0 10px 10px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    logContainer: {
      height: "70vh",
      padding: 0,
      paddingTop: "10px",
    },
    serviceIcon: {
      fill: "#465ee4",
      width: "10em",
      height: "8em",
      paddingRight: "5px",
    },
  })
);

interface RealtimeLogsProps {
  config: Config;
}

export default function RealtimeLogs(props: RealtimeLogsProps) {
  const websocketURL = `${props.config.aggregatorSocketUrl}?connectionType=consumer`;
  const classes = useStyles();
  const [open, onOpenSocket] = useState(false);
  const [colourRules, setColourRules] = React.useState<
    ColourRule[] | undefined
  >();
  const [state, setState] = useState({
    follow: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    getColourRules(props.config.aggregatorApiUrl).then((colourRules) => {
      setColourRules(colourRules);
    });
  }, [props.config]);

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container>
        <Grid
          className={classes.blue}
          item
          container
          direction="row"
          justify="space-between"
        >
          <Grid item container direction="column" xs={8} md={4}>
            <Grid item>
              <h2>Realtime Log Viewer</h2>
            </Grid>
            <Grid item>
              <p>Status: {open ? "Connected" : "Waiting for connection"}</p>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            xs={8}
            md={8}
          >
            <Grid item container spacing={4}>
              <Grid item>
                <Typography id="range-slider" gutterBottom>
                  Follow Logs
                </Typography>
                <Switch
                  checked={state.follow}
                  onChange={handleChange}
                  name="follow"
                  color="secondary"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container className={`${classes.logContainer}`} xs={12}>
          <Grid item className={`${classes.logContainer}`} xs={12}>
            <LazyLog
              enableSearch
              follow={state.follow}
              url={websocketURL}
              websocket
              colourRules={colourRules}
              extraLines={1}
              rowHeight={20}
              websocketOptions={{
                onOpen: () => {
                  console.info("Ready to recieve logs.");
                  onOpenSocket(true);
                },
                formatMessage: (e) => {
                  // Calls the onclickEventsSet once when logs are now visible.
                  const message = JSON.parse(e);
                  return message.content;
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
