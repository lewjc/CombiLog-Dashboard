import React from "react";
import {
	Box,
	Card,
	CardContent,
	createStyles,
	Divider,
	Grid,
	IconButton,
	makeStyles,
	Theme,
	Typography,
} from "@material-ui/core";
import { ColourRule } from "react-combilazylog";
import Config from "../config";
import ColourRuleModal from "./ColourRuleModal";
import { NotificationManager } from "react-notifications";
import CancelIcon from "@material-ui/icons/Cancel";
import APIRoutes from "../constants/APIRoutes";
import { DeleteColourRule } from "../types/ApiResponses";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			margin: "15px",
		},
		pos: {
			marginBottom: 12,
		},
		deleteIcon: {
			padding: "6px",
		},
		editIcon: {
			padding: "6px",
			float: "right",
		},
	})
);

export interface ColourRuleCardProps {
	config: Config;
	rule: ColourRule;
	reloadSettings: () => void;
}

export default function ColourRuleCard(props: ColourRuleCardProps) {
	const classes = useStyles();
	const defaultBackgroundColour = "#222222";
	const defaultTextColour = "#d6d6d6";

	const deleteColourRule = (rule: ColourRule) => {
		const url =
			props.config.aggregatorApiUrl +
			APIRoutes.aggregator.DELETE_COLOUR_RULE.replace("{name}", rule.name);

		return fetch(url, {
			method: "DELETE",
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					return response.json().then((json) => {
						NotificationManager.error(json?.message ?? "An error occured");
						console.error(
							"An Error Occured Deleting Colour Rule: " + json?.message
						);
						return null;
					});
				}
			})
			.then((responseObject: DeleteColourRule | null) => {
				if (responseObject !== null) {
					NotificationManager.success(responseObject.message);
				} else {
					console.error("The Response Object Was Empty.");
				}
			});
	};

	return (
		<Grid item container xs={4}>
			<Card className={classes.root}>
				<CardContent>
					<Grid item container>
						<Grid container item xs={8}>
							<Typography variant="h5" component="h2">
								{props.rule.name}
							</Typography>
						</Grid>
						<Grid item container xs={2} justify="flex-end">
							<ColourRuleModal
								aggregatorUrl={props.config.aggregatorApiUrl}
								onClose={props.reloadSettings}
								colourRule={props.rule}
								customButton={
									<IconButton className={classes.editIcon}>
										<EditIcon />
									</IconButton>
								}
							/>
						</Grid>
						<Grid item container xs={2} justify="flex-end">
							<IconButton
								className={classes.deleteIcon}
								onClick={() =>
									deleteColourRule(props.rule).then(props.reloadSettings)
								}
							>
								<CancelIcon />
							</IconButton>
						</Grid>
					</Grid>
					<Typography className={classes.pos} color="textSecondary">
						Pattern: {props.rule.rule.source}
					</Typography>
					<Divider light />

					<Box
						bgcolor={props.rule.backgroundColour ?? defaultBackgroundColour}
						color="primary.contrastText"
						p={2}
					>
						Background Colour
					</Box>
					<br />
					<Box
						bgcolor={props.rule.textColour ?? defaultTextColour}
						color="primary.contrastText"
						p={2}
					>
						Text Colour
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
}
