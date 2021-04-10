import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import APIRoutes from "../constants/APIRoutes";
import { GetSettingsResponse } from "../types/ApiResponses";
import Config from "../config";
import { Settings } from "../types/Settings";
import SettingsTabs from "../components/SettingsTabs";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loading from "../components/Loading";

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
      minWidth: 100,
      overflowWrap: "break-word",
      tableLayout: "fixed",
    },
    buttonContainer: {
      width: "100%",
      borderRadius: 0,
      textTransform: "none",
    },
    blue: {
      backgroundColor: "#3f51b5",
      borderRadius: "4px",
      color: "white",
      padding: "0 0 0 10px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    settingsIcon: {
      fill: "#465ee4",
      width: "3em",
      height: "3em",
      paddingRight: "5px",
    },
    tabRoot: {
      width: "100%",
    },
  })
);

interface SettingsPropType {
  config: Config;
}

export default function Setting(props: SettingsPropType) {
  const classes = useStyles();
  const [settings, setSettings] = useState<Settings | null>(null);

  const reloadSettings = () => {
    const url =
      props.config.aggregatorApiUrl + APIRoutes.aggregator.GET_SETTINGS;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((json) => {
            console.error(
              "Error occured retrieving settings: " + json?.message
            );
            return null;
          });
        }
      })
      .then((responseObject: GetSettingsResponse | null) => {
        if (responseObject !== null) {
          if (responseObject.settings.colourRules) {
            responseObject.settings.colourRules = responseObject.settings.colourRules.map(
              (rule) => {
                rule.rule = RegExp(rule.rule);
                return rule;
              }
            );
          }

          setSettings(responseObject.settings);
        } else {
          setSettings(null);
        }
      });
  };

  useEffect(() => {
    if (!settings) {
      reloadSettings();
    }
  });

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item container direction="column" justify="space-between" xs={12}>
          <Grid className={classes.blue} item container direction="row">
            <Grid
              item
              container
              direction="column"
              justify="center"
              xs={8}
              md={4}
            >
              <Grid item>
                <h2>Settings</h2>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignContent="flex-end"
              justify="center"
              md={8}
              xs={12}
            >
              <Grid item>
                <SettingsApplicationsIcon className={classes.settingsIcon} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item className={classes.tabRoot}>
            {settings ? (
              <SettingsTabs
                settings={settings}
                config={props.config}
                reloadSettings={reloadSettings}
              />
            ) : (
              <Loading descriptor="Settings" />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
