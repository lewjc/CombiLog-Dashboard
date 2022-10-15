import React, { forwardRef, useCallback, useState } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import {
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  Modal,
} from "@material-ui/core";
import APIRoutes from "../constants/APIRoutes";
import { Service } from "../types/Service";
import { NotificationManager } from "react-notifications";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
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
    addServiceAccordion: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      fontWeight: 500,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 500,
    },
    buttonContainer: {
      width: "100%",
      borderRadius: 0,
      textTransform: "none",
    },
    createService: {
      width: "100%",
    },
    showExampleButton: {
      width: "100%",
      borderRadius: 0,
      textTransform: "none",
      marginTop: "10px",
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
    exampleCode: {
      display: "block",
      whiteSpace: "pre-wrap",
    },
  })
);

const BulkUpload = forwardRef((props: any, ref: any) => {
  const classes = useStyles();
  const [showExample, setShowExample] = useState(false);
  const [uploading, setUploading] = useState(false);

  const doBulkUpload = useCallback(
    (services: Array<Service>): Promise<Response | void> | null => {
      let validUpload = true;

      services.forEach((service) => {
        if (!RegExp(/^[0-9A-Za-z\s-]+$/).test(service.friendlyName)) {
          validUpload = false;
        }

        if (
          !RegExp(/^[0-9A-Za-z\s-]+$/).test(service.secret) ||
          service.secret.length > 255
        ) {
          validUpload = false;
        }
      });

      if (validUpload) {
        const url = props.aggregatorUrl + APIRoutes.aggregator.ADD_BULK;
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set("Content-Type", "application/json");

        return fetch(url, {
          method: "post",
          headers: requestHeaders,
          body: JSON.stringify({
            services,
          }),
        }).then(() => {
          props.closeModal();
          NotificationManager.success("Bulk Upload was Successful");
          setUploading(false);
        });
      } else {
        // Notificaiton, the uploaded file was invalid.
        NotificationManager.error("Failed to parse file.");
        return null;
      }
    },
    [props]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onload = () => {
        const files = JSON.parse(reader.result?.toString() || "") as Service[];
        setUploading(true);
        doBulkUpload(files);
      };
      reader.readAsBinaryString(acceptedFiles[0]);
    },
    [doBulkUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/json",
    maxFiles: 1,
  });

  const exampleObj = `[
 {
  friendlyName: "MyService",
  secret: "MySuperDuperSecret",
 },
 {
  friendlyName: "MyService2",
  secret: "MySuperDuperSecret2",
 },
]`;

  return (
    <div className={classes.paper}>
      {uploading ? (
        <CircularProgress />
      ) : (
        <div>
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Click here to bulk-upload Services </p>
            </div>
          </section>
          <Button
            className={classes.showExampleButton}
            onClick={() => setShowExample(!showExample)}
          >
            {showExample ? "Hide Example" : "Show Example"}
          </Button>
          {showExample ? (
            <section>
              <code className={classes.exampleCode}>{exampleObj}</code>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
});

export default function BulkUploadModal(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.buttonContainer}>
      <span>
        <Button
          variant="contained"
          className={classes.buttonContainer}
          color="primary"
          onClick={handleOpen}
        >
          Bulk Upload Services
        </Button>
      </span>
      <Modal
        aria-labelledby="transition-modal-title"
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
        <Fade in={open}>
          <BulkUpload
            closeModal={handleClose}
            aggregatorUrl={props.aggregatorUrl}
          />
        </Fade>
      </Modal>
    </div>
  );
}
