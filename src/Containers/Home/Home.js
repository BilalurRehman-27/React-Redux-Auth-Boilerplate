import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { actions } from '../../redux/user';
import Loader from '../../Components/Loader';
import Tabs from '../../Components/Tabs';
import Select from '../../Components/Select';
import Table from '../../Components/Table';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    backgroundColor: theme.palette.primary.light,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const isLoading = useSelector((state) => {
    return state.user.isFetching;
  });
  const mainCategoriesList = useSelector((state) => {
    return state.user.mainCategories;
  });
  const waitersList = useSelector((state) => {
    return state.user.waiters;
  });

  const tablesList = useSelector((state) => {
    return state.user.tables;
  });

  const selectedCategoryId = useSelector((state) => {
    return state.user.selectedCategory;
  });

  const subCategoryFetching = useSelector((state) => {
    return state.user.subCategories?.subCategoryFetching;
  });

  const subCategories = useSelector((state) => {
    return state.user.subCategories;
  });

  const selectedSubCategoriesById = useSelector((state) => {
    return state.user.subCategories?.[selectedCategoryId];
  });

  const selectedItems = useSelector((state) => {
    return state.user.selectedItems;
  });

  const dispatch = useDispatch();
  console.log(selectedItems);
  useEffect(() => {
    dispatch(actions.getMainCategoriesBegin());
    dispatch(actions.getTablesBegin());
    dispatch(actions.getWaitersBegin());
  }, [dispatch]);

  useEffect(() => {
    if (
      mainCategoriesList &&
      mainCategoriesList.data.length &&
      tablesList &&
      tablesList.data.length &&
      waitersList &&
      waitersList.data.length
    ) {
      setList(() => [mainCategoriesList, waitersList, tablesList]);
    }
  }, [mainCategoriesList, waitersList, tablesList]);

  const handleOnChange = (categoryId) => {
    return !subCategories || !subCategories[categoryId]
      ? dispatch(actions.getSubCategoriesByIdBegin(categoryId))
      : dispatch(actions.setSelectedCategory(categoryId));
  };

  const handleSelectedSubCategoryItem = (selectedSubCategoryItem) => {
    dispatch(actions.setSelectedSubCategoryItems(selectedSubCategoryItem));
  };

  const handleQuantityChange = (quantity, rowId) => {
    dispatch(actions.setItemsQuantity(+quantity, rowId));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <aside>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {list.length && <Select data={list[1]} />}
        </Grid>
        <Grid item xs={12} sm={6}>
          {list.length && <Select data={list[2]} />}
        </Grid>
      </Grid>
      <Box className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Paper className={classes.paper}>
              {list.length && (
                <Tabs
                  categories={list[0]}
                  subCategories={selectedSubCategoriesById}
                  subCategoryFetching={subCategoryFetching}
                  onClick={handleOnChange}
                  handleSelectedSubCategoryItem={handleSelectedSubCategoryItem}
                  selectedItems={selectedItems}
                />
              )}
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Paper className={classes.paper}>
              <Table
                selectedItems={selectedItems}
                handleQuantityChange={handleQuantityChange}
              />
            </Paper>
          </Grid>
        </Grid>
        {/* {list.map((item, index) => (
        <Accordion
          name={item.name}
          key={index}
          data={item.data}
          onClick={handleOnChange}
          subCategories={selectedSubCategoriesById}
          subCategoryFetching={subCategoryFetching}
        />
      ))} */}
      </Box>
    </aside>
  );
};
export default memo(Home);
