import React, { ChangeEvent, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import APIRoutes from "../constants/APIRoutes";
import ColourPicker from "./ColourPicker";
import ModalBase from "./ModalBase";
import { ColourRule } from "react-combilazylog";
import { NotificationManager } from "react-notifications";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.secondary.main,
		boxShadow: theme.shadows[5],
		outline: "None",
		padding: theme.spacing(2, 4, 3),
	},
	root: {
		"& > *": {
			width: "50ch",
		},
	},
	createColourRule: {
		width: "100%",
	},
	ruleInput: {
		fontFamily: "monospace",
	},
	textInput: {
		width: "100%",
	},
}));

interface ColourRuleModalProps {
	aggregatorUrl: string;
	// Pass in an existing colour rule to use the modal as an edit function.
	colourRule?: ColourRule;
	onClose?: () => void;
	// If provided, override the default button used to open the modal.
	customButton?: ReactElement;
}

export default function ColourRuleModal(props: ColourRuleModalProps) {
	const classes = useStyles();
	const [open, setOpen] = React.useState<boolean>(false);
	const backgroundColourRef = React.useRef<HTMLInputElement>(null);
	const textColourRef = React.useRef<HTMLInputElement>(null);
	const [formState, setFormState] = React.useState<ColourRule>({
		name: props.colourRule ? props.colourRule.name : "",
		backgroundColour: props.colourRule?.backgroundColour
			? props.colourRule.backgroundColour
			: "#FFFFFF",
		textColour: props.colourRule ? props.colourRule?.textColour : "#FFFFFF",
		rule: props.colourRule ? props.colourRule.rule : /YOUR_PATTERN/,
	});

	const [validation, setValidation] = React.useState({
		name: true,
		rule: true,
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setValidation({
			name: true,
			rule: true,
		});
		if (props.onClose) {
			props.onClose();
		}
	};

	const updateFriendlyName = (evt: ChangeEvent<HTMLInputElement>) => {
		if (!evt.target) {
			setFormState({ ...formState, name: "" });
		} else {
			setFormState({ ...formState, name: evt.target.value });
		}
	};

	const updateRule = (evt: ChangeEvent<HTMLInputElement>) => {
		if (!evt.target) {
			setFormState({ ...formState, rule: new RegExp("YOUR_PATTERN") });
		} else {
			if (evt.target.value) {
				try {
					setFormState({ ...formState, rule: new RegExp(evt.target.value) });
				} catch (e) {
					setFormState({ ...formState, rule: new RegExp("") });
				}
			} else {
				setFormState({ ...formState, rule: new RegExp("") });
			}
		}
	};

	const onSubmit = async function addColourRule(
		name: string,
		backgroundColour: string | undefined,
		textColour: string | undefined,
		rule: RegExp
	): Promise<ColourRule | void | null> {
		let isValid = {
			name: true,
			rule: true,
		};

		if (!RegExp(/^[0-9A-Za-z\s-]+$/).test(name)) {
			isValid = { ...isValid, name: false };
		}

		rule.source;
		if (rule.source.length <= 2 || rule.source === "(?:)") {
			isValid = { ...isValid, rule: false };
		}

		isValid;
		if (!isValid.name || !isValid.rule) {
			setValidation({ ...validation, ...isValid });
			return;
		} else {
			setValidation({ ...validation, ...isValid });
		}

		const hexCheck = new RegExp(/^#[0-9a-f]{6}$/i);
		if (backgroundColour && !hexCheck.test(backgroundColour)) {
			return;
		}

		if (textColour && !hexCheck.test(textColour)) {
			return;
		}

		const url =
			props.aggregatorUrl +
			(props.colourRule
				? APIRoutes.aggregator.EDIT_COLOUR_RULE
				: APIRoutes.aggregator.ADD_COLOUR_RULE);
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set("Content-Type", "application/json");

		return await fetch(url, {
			method: props.colourRule ? "PATCH" : "POST",
			headers: requestHeaders,
			body: JSON.stringify({
				colourRule: {
					name: name.trim(),
					backgroundColour,
					textColour,
					rule: rule.source,
				},
			}),
		})
			.then((resp) => {
				if (resp.ok) {
					return resp.json();
				} else {
					return null;
				}
			})
			.then((json) => {
				if (!json) {
					return null;
				}
				return json.colourRule as ColourRule;
			})
			.then((colourRule) => {
				if (!colourRule) {
					return null;
				}
				colourRule.rule = RegExp(rule);
				colourRule;
				return colourRule;
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const content = (
		<div className={classes.paper}>
			<h2>Add Colour Rule</h2>
			<form className={classes.root} noValidate autoComplete="off">
				<Grid alignItems="flex-end" container direction="row" spacing={2}>
					<Grid item xs={12}>
						Add a regular expression or word to the pattern box{" "}
						<strong>(in JavaScript format)</strong> then select the text colour
						and line colour you would like to associate with the pattern.
					</Grid>
					<Grid item xs={12}>
						<TextField
							error={!validation.name}
							id="friendly-name"
							className={classes.textInput}
							value={formState.name}
							onChange={updateFriendlyName}
							disabled={props.colourRule !== undefined}
							label="Friendly Name"
							helperText={
								validation.name
									? ""
									: "Must contain letters, numbers or dashes."
							}
							color={"primary"}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							error={!validation.rule}
							inputProps={{ className: classes.ruleInput, spellCheck: false }}
							className={classes.textInput}
							id="cr-pattern"
							value={
								formState.rule.source === "(?:)" ? "" : formState.rule.source
							}
							onChange={updateRule}
							label="Pattern"
							helperText={
								validation.rule
									? ""
									: "Must contain valid regex OR word (See RegExp Format)"
							}
							color={"primary"}
						/>
					</Grid>
					<Grid item xs={12}>
						<ColourPicker
							labelText="Text Colour"
							ref={textColourRef}
							defaultValue={
								props.colourRule?.textColour
									? props.colourRule.textColour
									: undefined
							}
						/>
					</Grid>
					<Grid item xs={12}>
						<ColourPicker
							labelText="Background Colour"
							defaultValue={
								props.colourRule?.textColour
									? props.colourRule.backgroundColour
									: undefined
							}
							ref={backgroundColourRef}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							className={classes.createColourRule}
							variant="contained"
							color="primary"
							onClick={() => {
								onSubmit(
									formState.name,
									backgroundColourRef.current?.disabled
										? undefined
										: backgroundColourRef.current?.value,
									textColourRef.current?.disabled
										? undefined
										: textColourRef.current?.value,
									formState.rule
								).then((colourRule) => {
									if (colourRule) {
										NotificationManager.success(
											`Successfully ${
												props.colourRule ? "Edited" : "Added"
											}  Colour Rule ${colourRule.name}`
										);
										handleClose();
									} else if (colourRule === null) {
										NotificationManager.error(
											`Failed to ${
												props.colourRule ? "Edit" : "Add"
											} Colour Rule`
										);
										handleClose();
									}
								});
							}}
						>
							Finish
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);

	return (
		<ModalBase
			handleOpen={handleOpen}
			handleClose={handleClose}
			modal={content}
			customButton={
				props.customButton
					? React.cloneElement(props.customButton, { onClick: handleOpen })
					: undefined
			}
			title="Add Colour Rule"
			open={open}
		/>
	);
}
