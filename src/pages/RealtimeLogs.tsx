import React, { useEffect, useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, useTheme, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LazyLog } from "react-lazylog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Config from "../config";
import { Slider, Typography } from "@material-ui/core";

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
	const [selectedHighlightBound, setHighlightBound] = React.useState<number[]>([0, 0]);
	const [shiftLower, setShiftLower] = React.useState(0);
	const [shiftUpper, setShiftUpper] = React.useState(0);
	const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
	const [state, setState] = useState({
		follow: true,
	});

	const [selectedLine, setSelectedLine] = useState(0);

	const getSelectedLine = () => selectedLine;
	/**
	 * As the logger doesnt provide an interface into it's rows, manually setting events to take line info
	 */

	const setLogClickEvents = () => {
		// Function used to hook into and add click events to the lines of LazyLog.
		// Quite hacky way so idea would be to eventually clone LazyLog & add onClick events to lines.
		const logContainer: HTMLElement | null = document.querySelector(
			".ReactVirtualized__Grid__innerScrollContainer"
		);

		let mySelectedLine = getSelectedLine;

		const clickEvent = (event: MouseEvent) => {
			if (event.target) {
				const targetChildElement = (event.target as HTMLDivElement)?.firstChild as HTMLDivElement;

				const getAttributes = (elem: HTMLDivElement | Element | null) =>
					elem?.attributes.getNamedItem("id")?.value;
				let lineId;
				if (targetChildElement?.attributes) {
					lineId = getAttributes(targetChildElement);
				} else {
					if (targetChildElement.parentNode?.parentNode) {
						lineId = getAttributes(
							(targetChildElement.parentNode?.parentNode as HTMLDivElement).previousElementSibling
						);
					}
				}

				if (lineId) {
					if (parseInt(lineId) === selectedLine) {
						setSelectedLine(0);
					}
					if (event.shiftKey) {
						const otherParsedLine = parseInt(lineId);
						if (otherParsedLine > selectedLine) {
							setHighlightBound([0, selectedLine + (otherParsedLine - selectedLine)]);
						} else if (otherParsedLine < selectedLine) {
							setHighlightBound([selectedLine + (otherParsedLine - selectedLine), 0]);
						} else {
							setHighlightBound([0, 0]);
						}
					} else {
						const parsedLineId = parseInt(lineId);
						setSelectedLine(parsedLineId);
						setHighlightBound([0, 0]);
					}
				}
			}
		};

		if (logContainer && !logContainer.ondblclick) {
			// Not the best approach. needs revamping.
			logContainer.ondblclick = clickEvent;
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const handleHighlightBoundChange = (event: any, newValue: number | number[]) => {
		setHighlightBound(newValue as number[]);
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
						<Grid item container direction="column" xs={8} md={8}>
							<Grid item>
								<h2>Options:</h2>
							</Grid>
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
								<Grid item>
									<Typography id="range-slider" gutterBottom>
										Highlight Bounds
									</Typography>
									<Slider
										color="secondary"
										max={15}
										min={-15}
										value={selectedHighlightBound}
										onChange={handleHighlightBoundChange}
										valueLabelDisplay="auto"
										disabled={selectedLine === 0}
										aria-labelledby="range-slider"
									/>
								</Grid>
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
							scrollToLine={selectedLine ?? undefined}
							extraLines={1}
							highlight={[
								selectedLine + selectedHighlightBound[0],
								selectedLine + selectedHighlightBound[1],
							]}
							onHighlight={(range: Range) => {
								console.log(range);
							}}
							websocketOptions={{
								onOpen: (e, sock) => {
									console.info("Ready to recieve logs.");
									onOpenSocket(true);
								},
								formatMessage: (e) => {
									// Calls the onclickEventsSet once when logs are now visible.
									setLogClickEvents();
									const message = JSON.parse(e);
									if (message.service) {
										return `[${message.service.friendlyName}] ${message.content}`;
									}

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
