import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import APIRoutes from "../constants/APIRoutes";
import { ArchiveFileStructure } from "../types/ArchiveFileStructure";
import TreeView from "@material-ui/lab/TreeView";
import { ColourRule, LazyLog } from "react-combilazylog";
import Config from "../config";
import { Switch, Typography, useMediaQuery } from "@material-ui/core";
import { getColourRules } from "../util/requestUtil";
import MinusSquare from "../icons/MinusSquare";
import PlusSquare from "../icons/PlusSquare";
import CloseSquare from "../icons/CloseSquare";
import { StyledTreeItem } from "../components/StyledTreeItem";
import { NotificationManager } from "react-notifications";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },

    blue: {
      backgroundColor: "#3f51b5",
      borderRadius: "4px",
      color: "white",
      padding: "0 0 10px 10px",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    },
    archiveContainer: {
      height: "70vh",
      boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      padding: "35px",
      overflow: "scroll",
      overflowX: "hidden",
      backgroundColor: "#222222",
      color: "#eaeaea",
    },
    archiveContainerMobile: {
      marginBottom: "20px",
    },
    logContainer: {
      height: "70vh",
      boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      backgroundColor: "#222222",
    },
    option: {
      paddingTop: "12px",
    },
    archiveRoot: {
      paddingTop: "15px",
    },
  })
);

interface ArchiveProps {
  config: Config;
}

export default function Archive(props: ArchiveProps) {
  const classes = useStyles();
  const [structure, setStructure] = useState<ArchiveFileStructure | null>(null);
  const [showTree, setShowTree] = useState<boolean>(true);
  const [colourRules, setColourRules] = React.useState<
    ColourRule[] | undefined
  >();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState(" ");

  useEffect(() => {
    getColourRules(props.config.aggregatorApiUrl).then((colourRules) => {
      setColourRules(colourRules);
    });

    const url = props.config.archiveUrl + APIRoutes.archiver.GET_FILE_STRUCTURE;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return null;
      })
      .then((responseObject: ArchiveFileStructure | null) => {
        if (responseObject !== null) {
          setStructure(responseObject);
        } else {
          setStructure(responseObject);
        }
      })
      .catch((error) => {
        console.error(error);
        NotificationManager.error("Could not load archive.");
      });
  }, [props.config]);

  const getArchivedFileData = (node: ArchiveFileStructure) => {
    if (node.viewable) {
      const path = node.path?.split("/");
      if (path) {
        let url = props.config.archiveUrl;
        if (url) {
          switch (path[1]) {
            case "hot": {
              url += APIRoutes.archiver.GET_HOT_FILE.replace(
                "{logName}",
                path[2]
              );
              break;
            }
            case "service": {
              url += APIRoutes.archiver.GET_SERVICE_FILE.replace(
                "{serviceName}",
                path[2]
              ).replace("{logName}", path[3]);
              break;
            }

            case "archive": {
              url += APIRoutes.archiver.GET_ARCHIVE_FILE.replace(
                "{logName}",
                path[2]
              );
              break;
            }
          }
          fetch(url)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                // TODO: Handle Error
              }
            })
            .then((json: any) => setText(json.content));
        }
      }
    }
  };

  const handleShowTreeChange = () => setShowTree(!showTree);

  const renderTree = (nodes: ArchiveFileStructure) => (
    <StyledTreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      onClick={() => getArchivedFileData(nodes)}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );
  let treeView = null;
  if (structure) {
    treeView = (
      <TreeView
        className={classes.root}
        defaultExpanded={["root"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
      >
        {renderTree(structure)}
      </TreeView>
    );
  }

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid container>
        <Grid className={classes.blue} item container direction="row">
          <Grid item container direction="column" xs={8} md={4}>
            <Grid item>
              <h2>Archive</h2>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            xs={8}
            md={8}
          >
            <Grid item container spacing={4}>
              <Grid item>
                <div className={classes.option}>
                  <Typography id="hide-tree" gutterBottom>
                    Hide Tree View
                  </Typography>
                  <Switch
                    checked={showTree}
                    onChange={handleShowTreeChange}
                    name="follow"
                    color="secondary"
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid
          className={classes.archiveRoot}
          item
          container
          direction="row"
          justify="space-between"
        >
          {showTree ? (
            <Grid
              item
              xs={12}
              md={5}
              className={
                isMobileView
                  ? `${classes.archiveContainer} ${classes.archiveContainerMobile}`
                  : classes.archiveContainer
              }
            >
              {treeView}
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            md={showTree ? 7 : 12}
            className={classes.logContainer}
          >
            <LazyLog
              colourRules={colourRules}
              enableSearch
              text={text}
              rowHeight={20}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
