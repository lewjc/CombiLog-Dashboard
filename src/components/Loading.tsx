import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ReactLoading from "react-loading";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "12vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f6f6f6",
      border: "3px solid #3f51b5",
      borderRadius: "5px",
      flexDirection: "column",
      boxShadow:
        "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    },
    loadingText: {
      width: "100%",
      textAlign: "center",
      color: theme.palette.primary.main,
    },
    progress: {
      marginBottom: "20px",
    },
  })
);

export interface LoadingProps {
  descriptor?: string;
}

export default function Loading(props: LoadingProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className={classes.loadingText}>
        <h1>
          Loading{` ${props.descriptor ?? ""} `}{" "}
          <ReactLoading color="gray" type="bubbles" height={20} width={30} />
        </h1>
      </span>
    </div>
  );
}
