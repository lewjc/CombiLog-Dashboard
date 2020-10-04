import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, useTheme, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LazyLog } from "react-lazylog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Config from "../config";

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
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
	const [state, setState] = useState({
		follow: true,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<Container maxWidth="lg" className={classes.root}>
			<Grid container spacing={2}>
				<Grid item container direction="column" justify="space-between" xs={12}>
					<Grid className={classes.blue} item container direction="row" justify="space-between">
						<Grid item container direction="column" xs={8} md={4}>
							<Grid item>
								<h2>Realtime Log Viewer</h2>
							</Grid>
							<Grid item>
								<p>Status: {open ? "Connected" : "Waiting for connection"}</p>
							</Grid>
						</Grid>
						<Grid item container direction="column" xs={8} md={6}>
							<Grid item>
								<h2>Options:</h2>
							</Grid>
							<Grid item>
								<FormControlLabel
									control={
										<Switch
											checked={state.follow}
											onChange={handleChange}
											name="follow"
											color="secondary"
										/>
									}
									label="Follow Logs"
								/>
							</Grid>
						</Grid>
					</Grid>
					<br />
					<Grid item className={`${classes.logContainer}`}>
						<LazyLog
							enableSearch
							follow={state.follow}
							url={websocketURL}
							websocket
							extraLines={1}
							websocketOptions={{
								onOpen: (e, sock) => {
									console.info("Ready to recieve logs.");
									onOpenSocket(true);
								},
								formatMessage: (e) => {
									console.log(e);
									return JSON.parse(e).content;
								},
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
