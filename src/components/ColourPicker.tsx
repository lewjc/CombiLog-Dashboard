import { Checkbox, FormLabel, makeStyles } from "@material-ui/core";
import React, { ChangeEvent, ForwardedRef, forwardRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
	colourPicker: {
		marginLeft: "10px",
		border: 0,
		cursor: "pointer",
	},
	enabled: {
		cursor: "pointer",
		opacity: "1.0",
	},

	disabled: {
		cursor: "default",
		opacity: "0.6",
	},
}));

const ColourPicker = forwardRef(
	(props: ColourPickerProps, ref: ForwardedRef<HTMLInputElement>) => {
		const classes = useStyles();
		const [colour, setColour] = useState(props.defaultValue ?? "");
		const [checked, setChecked] = React.useState(
			props.defaultValue === undefined ? false : true
		);

		const updateColour = (evt: ChangeEvent<HTMLInputElement>) => {
			if (!evt.target) {
				setColour("");
			} else {
				setColour(evt.target.value);
			}
		};

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			if (checked) {
				setColour("");
			}
			setChecked(event.target.checked);
		};

		return (
			<div>
				<Checkbox
					checked={checked}
					color="primary"
					onChange={handleChange}
					inputProps={{ "aria-label": "enabled" }}
				/>
				<FormLabel>{props.labelText}</FormLabel>
				<input
					ref={ref}
					className={`${classes.colourPicker} ${
						checked ? classes.enabled : classes.disabled
					}`}
					value={colour}
					type="color"
					disabled={!checked}
					onChange={props.onChange ?? updateColour}
				/>
			</div>
		);
	}
);

export interface ColourPickerProps {
	labelText: string;
	ref?: React.Ref<HTMLInputElement>;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	defaultValue?: string;
}

export default ColourPicker;
