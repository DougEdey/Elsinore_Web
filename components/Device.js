import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Box, Card, CardActions, CardContent, Collapse, Tabs, Tab, TextField, IconButton, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Device({temperatureController}) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);
  const multipleProbes = temperatureController.tempProbeDetails.length > 1
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFormSubmit = (event) => {
    console.log(event)
  }
  return (
      <Card className={classes.root} key={temperatureController.name} variant="outlined">
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
        <CardActions disableSPacing>
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
            <form onSubmit={handleFormSubmit}>
              <TextField id="name" label="Name" value={temperatureController.name} />
              <TextField id="heatGpio" label="Heat GPIO" value={temperatureController.heatSettings?.gpio} />
              <TextField id="coolGpio" label="Cool GPIO" value={temperatureController.coolSettings?.gpio} />
              <AppBar position="static">
                <Tabs value={tabValue} onChange={handleChange} className={classes.root}  indicatorColor="primary"
            textColor="primary">
                  <Tab label="Manual" {...a11yProps(0)} />
                  <Tab label="Auto" {...a11yProps(1)} />
                  <Tab label="Hysteria" {...a11yProps(0)} />
                </Tabs>
              </AppBar>
              <TabPanel value={tabValue} index={0}>
                Manual Settings
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                Auto Settings
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                Hysteria Settings
              </TabPanel>
            </form>
          </CardContent>
        </Collapse>
      </Card>
  )
}

Device.propTypes = {
  temperatureController: PropTypes.any.isRequired,
}