import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, useTheme, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LazyLog } from "react-lazylog";

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
<<<<<<< HEAD
			margin: "2px",
=======
>>>>>>> feature/initial-dashboard
			boxShadow:
				"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
		},
		logContainer: {
			height: "70vh",
		},
<<<<<<< HEAD
		content: {
			marginTop: 10,
		},
=======
>>>>>>> feature/initial-dashboard
		serviceIcon: {
			fill: "#465ee4",
			width: "10em",
			height: "8em",
			paddingRight: "5px",
		},
	})
);

const websocketURL = `${process.env.REACT_APP_AGGREGATOR_CONSUMER_ENDPOINT}?connectionType=consumer`;

export default function RealtimeLogs() {
	const classes = useStyles();

	const [open, onOpenSocket] = useState(false);
	const [state, setState] = useState({
		follow: true,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<Container maxWidth="lg" className={classes.root}>
<<<<<<< HEAD
			<Grid container spacing={5}>
				<Grid item container direction="row" xs={12}>
=======
			<Grid container spacing={2}>
				<Grid item container direction="column" justify="space-between" xs={12}>
>>>>>>> feature/initial-dashboard
					<Grid className={classes.blue} item container direction="row" justify="space-between">
						<Grid item container direction="column" xs={8} md={4}>
							<Grid item>
								<h2>Dashboard</h2>
							</Grid>
						</Grid>
					</Grid>
<<<<<<< HEAD
					<Grid container justify="space-between" className={classes.content}>
						<Grid
							className={classes.blue}
							xs={12}
							md={4}
							item
							container
							direction="row"
							justify="space-between">
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
							justify="space-between">
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
							justify="space-between">
							<Grid item container direction="column" xs={8} md={4}>
								<Grid item>
									<h2>Service Info</h2>
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
							justify="space-between">
							<Grid item container direction="column" xs={8} md={4}>
								<Grid item>
									<h2>Recent Events</h2>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
=======
>>>>>>> feature/initial-dashboard
				</Grid>
			</Grid>
		</Container>
	);
}
