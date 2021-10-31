import React, { useCallback, useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AddServiceModal from "../components/AddServiceModal";
import Button from "@material-ui/core/Button";
import OnlineIcon from "../icons/OnlineIcon";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import MaterialTable, { Column } from "@material-table/core";
import APIRoutes from "../constants/APIRoutes";
import { Service as ServiceObject } from "../types/Service";
import { GetServicesResponse } from "../types/ApiResponses";
import Config from "../config";
import { NotificationManager } from "react-notifications";
import BulkUploadModal from "../components/BulkUploadModal";

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
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    serviceIcon: {
      fill: "#465ee4",
      width: "8em",
      height: "6em",
      paddingRight: "5px",
    },
  })
);

const columns: Column<Object>[] = [
  {
    title: "Freindly Name",
    field: "friendlyName",
  },
  {
    title: "Secret",
    field: "secret",
  },
  {
    title: "Online",
    field: "online",
    render: (data: any) => {
      const service = data as ServiceObject;
      return <OnlineIcon colour={service.online ? "#77ff77" : "#ff6060"} />;
    },
  },

  {
    title: "Events",
    field: "eventCount",
  },
  {
    title: "Date Added",
    field: "dateAdded",
    render: (data: any) => {
      if ((data as ServiceObject).dateAdded) {
        const dataTransform = data as ServiceObject;
        const date = new Date(dataTransform.dateAdded).toDateString();
        return <div> {date}</div>;
      } else {
        return <div />;
      }
    },
  },
];

interface ServicePropType {
  config: Config;
}

export default function Service(props: ServicePropType) {
  const classes = useStyles();
  const [services, setServices] = useState<ServiceObject[] | null>(null);
  const getServices = useCallback(() => {
    const url =
      props.config.aggregatorApiUrl + APIRoutes.aggregator.GET_ALL_SERVICES;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((responseObject: GetServicesResponse | null) => {
        if (responseObject !== null) {
          setServices(responseObject.services);
        } else {
          setServices(responseObject);
        }
      })
      .catch((err) => {
        console.error(err);
        NotificationManager.error("Could not load settings.");
      });
  }, [props.config.aggregatorApiUrl]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item container direction="column" justify="space-between" xs={12}>
          <Grid className={classes.blue} item container direction="row">
            <Grid item container direction="column" xs={8} md={4}>
              <Grid item>
                <h2>Services</h2>
              </Grid>
              <Grid item>
                <p>Registered: {services ? services.length : "-"}</p>
                <p>
                  Online:{" "}
                  {services
                    ? `${services.filter((x) => x.online).length}`
                    : "-"}
                </p>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="column"
              alignContent="flex-end"
              md={8}
              xs={12}
            >
              <CloudDoneIcon className={classes.serviceIcon} />
            </Grid>
          </Grid>
          <br />
          <Grid item container direction="row"></Grid>
        </Grid>
        <Grid item container xs={4}>
          <AddServiceModal aggregatorUrl={props.config.aggregatorApiUrl} />
        </Grid>
        <Grid item container xs={4}>
          <BulkUploadModal aggregatorUrl={props.config.aggregatorApiUrl} />
        </Grid>
        <Grid item container xs={4}>
          <Button
            variant="contained"
            className={classes.buttonContainer}
            color="primary"
            onClick={() => {
              setServices(null);
              getServices();
            }}
          >
            Refresh Services
          </Button>{" "}
        </Grid>
        <Grid item container xs={12}>
          <Grid item container>
            <Grid item xs={12}>
              <div>
                <MaterialTable
                  isLoading={services === null}
                  title="Service List"
                  columns={columns}
                  data={services === null ? [{}] : services}
                  style={{ maxWidth: "100%", padding: "0px 10px 0px 10px" }}
                  options={{
                    search: true,
                    showEmptyDataSourceMessage: true,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
