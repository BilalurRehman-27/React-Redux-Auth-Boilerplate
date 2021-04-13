import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListView from '../Components/ListView';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '10px',
  },

  innerRoot: {
    width: '100%',
    display: 'inline',
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
  },
  expandedPanel: {
    backgroundColor: '#ccc',
  },
  padding: {
    padding: '0 10px',
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();
  const { name, data } = props;

  return (
    <>
      <div className={classes.root}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            classes={{ expanded: classes.expandedPanel }}
          >
            <Typography className={classes.heading}>{name}</Typography>
          </AccordionSummary>
          {name === 'Main Category' ? (
            data.map((item) => (
              <div className={classes.padding} key={item.id}>
                <AccordionDetails className={classes.innerRoot}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                      classes={{ expanded: classes.expandedPanel }}
                    >
                      <Typography className={classes.heading}>
                        {item.name}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails></AccordionDetails>
                  </Accordion>
                </AccordionDetails>
              </div>
            ))
          ) : (
            <ListView data={data} />
          )}
        </Accordion>
      </div>
    </>
  );
}
