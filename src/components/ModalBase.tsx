import React, { ReactElement } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		width: "100%",
		borderRadius: 0,
		textTransform: "none",
	},
}));

export interface ModalBaseProps {
	title: string;
	modal: ReactElement;
	handleOpen: () => void;
	handleClose: () => void;
	open: boolean;
	customButton?: ReactElement;
}

export default function ModalBase(props: ModalBaseProps) {
	const classes = useStyles();
	return (
		<div className={classes.buttonContainer}>
			{props.customButton ? (
				props.customButton
			) : (
				<span>
					<Button
						variant="contained"
						className={classes.buttonContainer}
						color="primary"
						onClick={props.handleOpen}
					>
						{props.title}
					</Button>
				</span>
			)}
			<Modal
				aria-labelledby="transition-odal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={props.open}
				onClose={props.handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={props.open}>{props.modal}</Fade>
			</Modal>
		</div>
	);
}
