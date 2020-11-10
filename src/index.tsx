import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";
import { isConfig } from "./config";

const theme = createMuiTheme();
console.log(theme.palette);
theme.palette.secondary.main = "#f4f4f4";
theme.palette.secondary.dark = "#b8b8b8";

fetch(`${window.location.pathname === "/" ? "" : window.location.pathname}/config/config.json`)
	.then((x) => x.json())
	.then((conf) => {
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
	})
	.catch((err) => {
		console.error("Failed to load configuration file: " + err);
	});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
