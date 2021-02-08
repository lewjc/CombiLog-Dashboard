import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {
  createStyles,
  DialogContent,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      backgroundColor: "#3f51b5",
      color: "#f1f1f1",
    },
    tab: {
      textTransform: "none",
    },
    icon: {
      padding: "6px",
    },
  })
);
export interface InternalDialogProps {
  open: boolean;
  dialogTitle: string;
  infoText: string;
  onClose: () => void;
}

function InternalDialog(props: InternalDialogProps) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle className={classes.dialog} id="simple-dialog-title">
        {props.dialogTitle}
      </DialogTitle>
      <DialogContent className={classes.dialog}>
        <p> {props.infoText}</p>
      </DialogContent>
    </Dialog>
  );
}

export interface InfoDialogProps {
  title: string;
  content: string;
}

export default function InfoDialog(props: InfoDialogProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item container justify="flex-end">
      <IconButton className={classes.icon} onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <InternalDialog
        dialogTitle={props.title}
        infoText={props.content}
        open={open}
        onClose={handleClose}
      />
    </Grid>
  );
}
