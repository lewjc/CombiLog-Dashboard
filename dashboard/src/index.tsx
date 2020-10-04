import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme();
console.log(theme.palette);
theme.palette.secondary.main = "#f4f4f4";
theme.palette.secondary.dark = "#b8b8b8";

const config = fetch("settings.json").then((x) => x.json);

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
