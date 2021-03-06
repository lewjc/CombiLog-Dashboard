import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
      margin: "2px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    logContainer: {
      height: "70vh",
    },
    content: {
      marginTop: 10,
      height: "8em",
      paddingRight: "5px",
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={5}>
        <Grid item container direction="row" xs={12}>
          <Grid
            className={classes.blue}
            item
            container
            direction="row"
            justify="space-between"
          >
            <Grid item container direction="column" xs={8} md={4}>
              <Grid item>
                <h2>Dashboard</h2>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={classes.content}>
            <Grid
              className={classes.blue}
              xs={12}
              md={4}
              item
              container
              direction="row"
              justify="space-between"
            >
              <Grid item container direction="column" xs={8} md={4}>
                <Grid item>
                  <h2>Statistics</h2>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              className={classes.blue}
              xs={12}
              md={7}
              item
              container
              direction="row"
              justify="space-between"
            >
              <Grid item container direction="column" xs={8} md={4}>
                <Grid item>
                  <h2>Realtime Information</h2>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              className={classes.blue}
              xs={12}
              md={4}
              item
              container
              direction="row"
              justify="space-between"
            >
              <Grid item container direction="column" xs={8} md={4}>
                <Grid item>
                  <h2>Top 5 Services</h2>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              className={classes.blue}
              xs={12}
              md={7}
              item
              container
              direction="row"
              justify="space-between"
            >
              <Grid item container direction="column" xs={8} md={4}>
                <Grid item>
                  <h2>Recent Events</h2>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
