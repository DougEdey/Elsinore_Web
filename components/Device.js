import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

import UpdateTemperatureController from "./graphql/UpdateTemperatureController.graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 400,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  probe: {
    textAlign: "right",
  },
  expand: {
    marginLeft: 'auto',
  },
  rootForm: {
    '& > *': {
      margin: theme.spacing(1),
      width: '95%',
    },
  },
}));

export default function Device({ temperatureController }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expandedHeat, setExpandedHeat] = React.useState(false);
  const multipleProbes = temperatureController.tempProbeDetails.length > 1
  const handleExpandClick = (pane) => {
    if (pane === 'general') {
      setExpanded(!expanded);
      setExpandedHeat(false);
    } else if (pane === 'heat') {
      setExpandedHeat(!expandedHeat);
      setExpanded(false);
    }
  };

  const [temperatureControllerSettings] = React.useState({
    id: temperatureController.id,
    name: temperatureController.name,
  });

  const id = useField(temperatureControllerSettings?.id, [temperatureControllerSettings.id])
  const name = useField(temperatureControllerSettings?.name, [temperatureControllerSettings.name])

  const fields = {id, name}
  
  const [updateController] = useMutation(UpdateTemperatureController)
  
  const {submit} = useSubmit(
    async fieldValues => {
      updateController({variables: {controllerSettings: getValues(fieldValues)}}) 
      return { status: 'success'} ;
    },
    fields,
  );

  return (
    <Card
      className={classes.root}
      key={temperatureController.id}
      variant="outlined"
    >
      <CardContent>
        <Typography colour="textSecondary" gutterBottom>
          {temperatureController.name}
        </Typography>
        {temperatureController.tempProbeDetails.map((probe) => {
          let probeDescription = probe.reading;
          if (multipleProbes) {
            probeDescription = `${probe.name} - ${probe.reading}`;
          }
          return (
            <Typography
              key={probe.physAddr}
              className={classes.probe}
              component="h2"
            >
              {probeDescription}
            </Typography>
          );
        })}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand)}
          onClick={() => handleExpandClick('general')}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <SettingsIcon color={expanded ? "primary" : "secondary"} />
        </IconButton>
        <IconButton
          className={clsx(classes.expand)}
          onClick={() => handleExpandClick('heat')}
          aria-expanded={expandedHeat}
          aria-label="show more"
        >
          <WhatshotIcon color={expandedHeat ? "primary" : "secondary"} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={submit} className={classes.rootForm}>
            
            <Input {...fields.id } type="hidden" />
            <FormControl>
              <InputLabel htmlFor="id">Name</InputLabel>
              <Input {...fields.name} />
            </FormControl>
            <FormControl>
              <Button type="submit" value="submit">
                Save
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Collapse>
      <Collapse in={expandedHeat} timeout="auto" unmountOnExit>
        <CardContent>

          <form onSubmit={submit} className={classes.rootForm}>
            
            <Input {...fields.id } type="hidden" />
            <FormControl>
              <InputLabel htmlFor="id">Name</InputLabel>
              <Input {...fields.name} />
            </FormControl>
            <FormControl>
              <Button type="submit" value="submit">
                Save
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Device.propTypes = {
  temperatureController: PropTypes.object.isRequired,
};
