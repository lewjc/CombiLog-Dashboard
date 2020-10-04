import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AddServiceModal from "../components/AddServiceModal";
import Button from "@material-ui/core/Button";

import CloudDoneIcon from "@material-ui/icons/CloudDone";
import MaterialTable, { Column } from "material-table";
import APIRoutes from "../constants/APIRoutes";
import { Service as ServiceObject } from "../types/Service";
import { GetServicesResponse } from "../types/ApiResponses";

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
			padding: "0 0 10px 10px",
			height: "30vh",
			boxShadow:
				"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
		},
		serviceIcon: {
			fill: "#465ee4",
			width: "10em",
			height: "8em",
			paddingRight: "5px",
		},
	})
);

export default function NotFound() {
	const classes = useStyles();
	return (
		<Container maxWidth="lg" className={classes.root}>
			<Grid container spacing={2}>
				<Grid item container direction="column" justify="space-between" xs={12}>
					<Grid className={classes.blue} item container direction="row">
						<Grid item container direction="column" justify="center" alignItems="center">
							<Grid item>
								<h2>404 Page not found</h2>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
