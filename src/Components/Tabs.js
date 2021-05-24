import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Tab, Tabs, AppBar } from '@material-ui/core';
import Card from '../Components/Card';
import CircularIndeterminate from '../Components/CircularLoader';

function TabPanel(props) {
  const { children, value, index, isLoading, ...other } = props;
  if (isLoading) return <CircularIndeterminate />;
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      style={{ minHeight: '10vh' }}
      {...other}
    >
      {value === index && <Box item='div'>{children}</Box>}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ScrollableTabsButtonAuto = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {
    categories,
    onClick,
    subCategories,
    subCategoryFetching,
    handleSelectedSubCategoryItem,
    selectedItems,
  } = props;

  useEffect(() => {
    onClick(categories.data[0].id);
    // eslint-disable-next-line
  }, []);

  const handleChange = (event, newValue) => {
    event.stopPropagation();
    setValue(newValue);
    onClick(categories.data[newValue].id);
  };

  const handleSubCategorySelection = (selectedSubCategoryItem) => {
    delete selectedSubCategoryItem.quantity;
    const selectedSubCategoryQuantity = selectedItems.find(
      (item) => item.id === selectedSubCategoryItem.id
    );
    handleSelectedSubCategoryItem({
      ...selectedSubCategoryItem,
      quantity: selectedSubCategoryQuantity
        ? selectedSubCategoryQuantity.quantity
        : 0,
    });
  };
  const renderTabPanel = (selectedTabIndx) => {
    return (
      <TabPanel
        value={value}
        index={selectedTabIndx}
        isLoading={subCategoryFetching}
      >
        <Grid container spacing={0}>
          {subCategories &&
            subCategories.map((subCategory) => {
              return (
                <Grid key={subCategory.id} item md={4} lg={4} xs={4} sm={4}>
                  <Card
                    subCategory={subCategory}
                    handleSelection={handleSubCategorySelection}
                    isCardSelected={
                      selectedItems
                        ? !!selectedItems.find(
                            (item) => item.id === subCategory.id
                          )
                        : false
                    }
                  />
                </Grid>
              );
            })}
        </Grid>
      </TabPanel>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          {categories.data.map((category) => {
            return (
              <Tab
                key={category.id}
                label={category.name}
                {...a11yProps(category.id)}
              />
            );
          })}
        </Tabs>
      </AppBar>
      {renderTabPanel(value)}
    </div>
  );
};

export default memo(ScrollableTabsButtonAuto);
