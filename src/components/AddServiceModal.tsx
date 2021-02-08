import React, { ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import APIRoutes from "../constants/APIRoutes";
import { Service } from "../types/Service";
import { NotificationManager } from "react-notifications";
import { AddServiceResponse } from "../types/ApiResponses";

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
  createdService: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    boxShadow: theme.shadows[5],
    outline: "None",
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    "& > *": {
      width: "50ch",
    },
  },
  buttonContainer: {
    width: "100%",
    borderRadius: 0,
    textTransform: "none",
  },
  createService: {
    width: "100%",
  },
  affirmDetailsButton: {
    ":hover": {
      backgroundColor: "#fafafa",
    },
    width: "100%",
    color: "#0f0f0f",
  },
}));

interface AddServiceModalProps {
  aggregatorUrl: string;
}

export default function AddServiceModal(props: AddServiceModalProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState({
    friendlyName: "",
    secret: "",
  });

  const [createdService, setCreatedService] = React.useState<Service>();
  const [isValid, setIsValid] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsValid(true);
    if (createdService) {
      setCreatedService(undefined);
    }
  };

  const updateFriendlyName = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target) {
      setFormState({ ...formState, friendlyName: "" });
    } else {
      setFormState({ ...formState, friendlyName: evt.target.value });
    }
  };

  const updateSecret = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target) {
      setFormState({ ...formState, secret: "" });
    } else {
      setFormState({ ...formState, secret: evt.target.value });
    }
  };

  const clearFormState = () => {
    setFormState({
      ...formState,
      secret: "",
      friendlyName: "",
    });
  };

  const onSubmit = async function registerService(
    friendlyName: string,
    secret: string
  ): Promise<Service | void> {
    handleClose();

    if (!RegExp(/^[0-9A-Za-z\s-]+$/).test(friendlyName)) {
      setIsValid(false);
      return;
    }

    if (!RegExp(/^[0-9A-Za-z\s-]+$/).test(secret) || secret.length > 255) {
      setIsValid(false);
    }

    const url = props.aggregatorUrl + APIRoutes.aggregator.ADD_SERVICE;
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");

    return await fetch(url, {
      method: "post",
      headers: requestHeaders,
      body: JSON.stringify({ friendlyName, secret }),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.json().then((x: AddServiceResponse) => {
            NotificationManager.error(x.message);
            return null;
          });
        }
      })
      .then((json) => {
        if (json) {
          return json.service as Service;
        }
      })
      .catch((error) => {
        NotificationManager.error("Failed to add service.");
        console.error(error);
      });
  };

  let content;
  if (createdService) {
    content = (
      <div className={classes.createdService}>
        <h2>Successfully Created Service</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid alignItems="flex-end" container direction="row" spacing={2}>
            <Grid item xs={12}>
              Here are the details:
            </Grid>
            <Grid item xs={6}>
              <p>Friendly Name: </p>
              <p>Secret: </p>
            </Grid>
            <Grid item xs={6}>
              <p>{createdService.friendlyName}</p>
              <p>{createdService.secret}</p>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.affirmDetailsButton}
                variant="contained"
                color="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  } else {
    content = (
      <div className={classes.paper}>
        <h2>Service Definition</h2>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid alignItems="flex-end" container direction="row" spacing={2}>
            <Grid item xs={12}>
              Enter a name that represents the service you will be connecting to
              the secret. If a secret is not provided one will be generated for
              you.
            </Grid>
            <Grid item xs={6}>
              <TextField
                error={!isValid}
                id="friendly-name"
                value={formState.friendlyName}
                onChange={updateFriendlyName}
                label="Friendly Name"
                helperText={
                  isValid ? "" : "Must contain letters, numbers or dashes."
                }
                color={"primary"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="secret"
                value={formState.secret}
                onChange={updateSecret}
                label="Secret (optional)"
                color={"primary"}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.createService}
                variant="contained"
                color="primary"
                onClick={() => {
                  onSubmit(formState.friendlyName, formState.secret).then(
                    (result) => {
                      if (result && isValid) {
                        setCreatedService(result);
                        clearFormState();
                        handleClose();
                        handleOpen();
                      } else {
                        clearFormState();
                        handleOpen();
                      }
                    }
                  );
                }}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }

  return (
    <div className={classes.buttonContainer}>
      <span>
        <Button
          variant="contained"
          className={classes.buttonContainer}
          color="primary"
          onClick={handleOpen}
        >
          Register New Service
        </Button>
      </span>
      <Modal
        aria-labelledby="transition-odal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>{content}</Fade>
      </Modal>
    </div>
  );
}
