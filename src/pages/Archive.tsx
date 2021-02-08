import React, { useEffect, useState } from "react";
import {
  fade,
  makeStyles,
  withStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import APIRoutes from "../constants/APIRoutes";
import { ArchiveFileStructure } from "../types/ArchiveFileStructure";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { TransitionProps } from "@material-ui/core/transitions";
import { LazyLog } from "react-combilazylog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Config from "../config";
import { Switch, Typography } from "@material-ui/core";

function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      "& .close": {
        opacity: 0.3,
      },
    },
    group: {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
  })
)((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

const useStyles = makeStyles((theme: Theme) =>
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
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const [text, setText] = useState(" ");

  useEffect(() => {
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
      });
  }, []);

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
    <Container maxWidth="lg" className={classes.root}>
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
            <LazyLog enableSearch text={text} rowHeight={20} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
