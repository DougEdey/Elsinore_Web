import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardActions, CardContent, Collapse, IconButton, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';
import {useMutation} from '@apollo/client'
import {updateTemperatureController} from './graphql/UpdateTemperatureController.graphql'
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  probe: {
    textAlign: 'right',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function Device({temperatureController}) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);
  const multipleProbes = temperatureController.tempProbeDetails.length > 1
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [temperatureControllerSettings] = React.useState({
    id: temperatureController.id,
    name: temperatureController.name,
  })

  
  const [updateController] = useMutation(updateTemperatureController)
  const {register, handleSubmit, setValue } = useForm({mode: 'onBlur'})
  const handleFormSubmit = (data) => {
    console.log(data)
    updateController({variables: {controllerSettings: data}})
  }

  useEffect(() => {
    if (temperatureControllerSettings) {
      console.log("SetValue", temperatureControllerSettings);
      setValue("id", temperatureControllerSettings.id);
      setValue("name", temperatureControllerSettings.name);
    }
  }, [temperatureControllerSettings])

  return (
    <Card className={classes.root} key={temperatureController.id} variant="outlined">
      <CardContent>
        <Typography colour="textSecondary" gutterBottom>
          {temperatureController.name}
        </Typography>
        {
          temperatureController.tempProbeDetails.map(probe => {
            var probeDescription = probe.reading
            if (multipleProbes) {
              probeDescription = `${probe.name} - ${probe.reading}`
            }
            return <Typography key={probe.physAddr} className={classes.probe} component="h2">{probeDescription}</Typography>
          })
        }
      </CardContent>
      <CardActions disableSpacing>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input { ...register("id" ) } type="hidden" />
            <input  { ...register("name", {
              pattern: {
                value: /[A-Za-z0-9]+/,
                message: "Bad name",
              },
            })}/>
            <Button type="submit" value="submit">
              Save
            </Button>
          </form>
        </CardContent>
      </Collapse>
    </Card>
  )
}

Device.propTypes = {
  temperatureController: PropTypes.any.isRequired,
}