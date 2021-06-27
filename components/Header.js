import React, { useCallback, useState } from "react";
import _ from "lodash";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Link,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useI18n } from "@shopify/react-i18n";
import { useQuery, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import clsx from "clsx";
import RedditIcon from "@material-ui/icons/Reddit";
import GitHubIcon from "@material-ui/icons/GitHub";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Icon } from "@iconify/react";
import discordIcon from "@iconify/icons-simple-icons/discord";

import ThemeToggle from "./ThemeToggle";
import BreweryDetailsQuery from "./graphql/BreweryDetailsQuery.graphql";
import UpdateBrewerySettings from "./graphql/UpdateBrewerySettings.graphql";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

export default function Header({ drawerOpen, setDrawerOpen }) {
  const theme = useTheme();
  const chevronIcon =
    theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />;
  const classes = useStyles();
  const [i18n] = useI18n();
  const { data } = useQuery(BreweryDetailsQuery, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000,
  });
  const [showDialog, setShowDialog] = useState(false);

  const settings = data?.settings;
  const breweryName = data?.settings?.breweryName
    ? data?.settings.breweryName
    : i18n.translate("Header.name");

  const toggleEditDialog = useCallback(() => {
    setShowDialog(!showDialog);
  }, [setShowDialog, showDialog]);

  if (!data) {
    return "Loading...";
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={
          (classes.appBar,
          {
            [classes.appBarShift]: drawerOpen,
          })
        }
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onDoubleClick={toggleEditDialog}
          >
            {breweryName}
          </Typography>
          <ThemeToggle />
        </Toolbar>
        <EditBreweryNameDialog
          settings={settings}
          open={showDialog}
          toggleVisibility={toggleEditDialog}
          i18n={i18n}
        />
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            {chevronIcon}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="reddit">
            <ListItemIcon>
              <RedditIcon />
            </ListItemIcon>
            <Link
              href="https://reddit.com/r/strangebrew"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <ListItemText>{i18n.translate("Sidebar.reddit")}</ListItemText>
            </Link>
          </ListItem>
          <ListItem button key="github">
            <ListItemIcon>
              <GitHubIcon />
            </ListItemIcon>
            <Link
              href="https://github.com/dougedey/elsinore_web"
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              <ListItemText>{i18n.translate("Sidebar.github")}</ListItemText>
            </Link>
          </ListItem>
          <ListItem button key="discord">
            <ListItemIcon>
              <Icon width="24px" height="24px" icon={discordIcon} />
            </ListItemIcon>
            <ListItemText>{i18n.translate("Sidebar.discord")}</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

Header.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  setDrawerOpen: PropTypes.func.isRequired,
};
function EditBreweryNameDialog({ settings, open, toggleVisibility, i18n }) {
  const [showUpdated, setShowUpdated] = useState(false);
  const updatedText = i18n.translate("Header.editDialog.updatedText");

  const updatedSettings = settings ? _.cloneDeep(settings) : {};
  delete updatedSettings.__typename;

  const [updateBrewerySettings] = useMutation(UpdateBrewerySettings);
  async function onSubmit(values) {
    await updateBrewerySettings({
      variables: {
        updatedSettings: values,
      },
    });
    setShowUpdated(true);
    toggleVisibility();
  }

  const mainForm = (
    <Form
      onSubmit={onSubmit}
      initialValues={updatedSettings}
      render={({ handleSubmit, dirty }) => (
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label={i18n.translate("Header.editDialog.breweryName")}
            name="breweryName"
          />
          <DialogActions>
            <Button onClick={toggleVisibility} color="primary">
              {i18n.translate("Header.editDialog.cancel")}
            </Button>
            <Button onClick={handleSubmit} disabled={!dirty} color="secondary">
              {i18n.translate("Header.editDialog.update")}
            </Button>
          </DialogActions>
        </form>
      )}
    />
  );
  return (
    <>
      <Dialog
        open={open}
        onClose={toggleVisibility}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {i18n.translate("Header.editDialog.title", {
            name: settings.breweryName,
          })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {i18n.translate("Header.editDialog.body", {
              name: settings.breweryName,
            })}
          </DialogContentText>
          {mainForm}
        </DialogContent>
      </Dialog>
      <Snackbar
        open={showUpdated}
        onClose={() => setShowUpdated(false)}
        message={updatedText}
      />
    </>
  );
}

EditBreweryNameDialog.propTypes = {
  settings: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  i18n: PropTypes.func.isRequired,
};
