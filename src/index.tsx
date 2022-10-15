import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";
import Config, { EnvironmentConfig, isConfig } from "./config";

const theme = createTheme();
theme.palette.secondary.main = "#f4f4f4";
theme.palette.secondary.dark = "#b8b8b8";

/**
 * This extension to the global window object allows the application to take environment variables in as configuration options. This avoids the need for static configuration being mounted via volumes.
 * More explanation in the README.
 */
declare global {
  interface Window {
    _env_: EnvironmentConfig;
  }
}

const conf: Config = {
  aggregatorApiUrl: window._env_.AGGREGATOR_URL,
  aggregatorSocketUrl: window._env_.AGGREGATOR_SOCKET_ADDRESS,
  archiveUrl: window._env_.ARCHIVE_URL,
};

if (isConfig(conf)) {
  ReactDOM.render(
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        <App config={conf} />
      </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
} else {
  throw new Error(
    "Config file does not contain all necessary values. Please consult example.config.json."
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
