import React, { memo, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Grid, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { actions } from '../../redux/user';
import Loader from '../../Components/Loader';
import Tabs from '../../Components/Tabs';
import Select from '../../Components/Select';
import Table from '../../Components/Table';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  container: {
    padding: 10,
    backgroundColor: theme.palette.primary.light,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  '& > *': {
    margin: theme.spacing(1),
    width: '25ch',
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Home = () => {
  const classes = useStyles();
  const [list, setList] = useState([]);

  const isLoading = useSelector((state) => {
    return state.user.isFetching;
  });
  const mainCategoriesList = useSelector((state) => {
    return state.user.mainCategories;
  });

  const salePersonsList = useSelector((state) => {
    return state.user.salePersons;
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

  const selectedSalePerson = useSelector((state) => {
    return state.user.selectedSalePerson;
  });

  const selectedTable = useSelector((state) => {
    return state.user.selectedTable;
  });

  const remarks = useSelector((state) => {
    return state.user.remarks;
  });

  const isOrderSaved = useSelector((state) => {
    return state.user.isOrderSaved;
  });

  const loggedInUserId = useSelector((state) => {
    return state.user.loggedInUserId;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getMainCategoriesBegin());
    dispatch(actions.getTablesBegin());
    dispatch(actions.getWaitersBegin());
    dispatch(actions.getSalesPersonBegin());
  }, [dispatch]);

  useEffect(() => {
    if (
      mainCategoriesList &&
      mainCategoriesList.data.length &&
      tablesList &&
      tablesList.data.length &&
      waitersList &&
      waitersList.data.length &&
      salePersonsList &&
      salePersonsList.data.length
    ) {
      setList(() => [
        mainCategoriesList,
        waitersList,
        tablesList,
        salePersonsList,
      ]);
    }
  }, [mainCategoriesList, waitersList, tablesList, salePersonsList]);

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

  const handleRemarksChange = (event) => {
    dispatch(actions.setRemarks(event.target.value));
  };

  const handleSave = () => {
    const totalQuantity = selectedItems.reduce(
      (accumulator, current) => accumulator + current.quantity,
      0
    );
    const totalAmount = selectedItems.reduce(
      (accumulator, current) =>
        accumulator + current.quantity * current.tagRate,
      0
    );

    const filteredItems = selectedItems.map((element) => {
      return {
        ItemCode: element.itemCode,
        QtyPcs: element.quantity,
        RatePcs: element.tagRate,
        Amount: element.quantity * element.tagRate,
      };
    });
    const payload = {
      Waiter: loggedInUserId,
      Remarks: remarks,
      TotalQty: totalQuantity,
      TotalNetAmount: totalAmount,
      TableCode: selectedTable,
      EmpNo: selectedSalePerson,
      items: filteredItems,
    };

    dispatch(actions.saveOrderBegin(payload));
  };

  const handleWaiterSelect = (value) => {
    dispatch(actions.setSelectedSalePerson(value));
  };

  const handleTableSelect = (value) => {
    dispatch(actions.setSelectedTable(value));
  };

  const deleteSelectedItem = (item) => {
    dispatch(actions.deleteSelectedItem(item));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <aside>
      {!!isOrderSaved && (
        <div className={classes.alert}>
          <Snackbar
            open={isOrderSaved}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert severity='success'>Order has been successfully</Alert>
          </Snackbar>
        </div>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          {list.length && (
            <Select
              data={list[3]}
              handleSelect={handleWaiterSelect}
              value={selectedSalePerson}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {list.length && (
            <Select
              data={list[2]}
              handleSelect={handleTableSelect}
              value={selectedTable}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Box className={classes.root}>
            <TextField
              id='remarks-basic'
              label='Remarks'
              variant='outlined'
              onChange={handleRemarksChange}
            />
          </Box>
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
                handleSave={handleSave}
                selectedTable={selectedTable}
                selectedSalePerson={selectedSalePerson}
                selectedItems={selectedItems}
                deleteSelectedItem={deleteSelectedItem}
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
