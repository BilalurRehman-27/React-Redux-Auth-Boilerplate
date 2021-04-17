import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { actions } from '../../redux/user';
import Loader from '../../Components/Loader';
import Accordion from '../../Components/Accordion';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 10,
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function Home() {
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

  const dispatch = useDispatch();

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

  const handleOnChange = (item) => {
    console.log(subCategories[item.id]);
    return !subCategories[item.id]
      ? dispatch(actions.getSubCategoriesByIdBegin(item.id))
      : dispatch(actions.setSelectedCategory(item.id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box className={classes.container}>
      {list.map((item, index) => (
        <Accordion
          name={item.name}
          key={index}
          data={item.data}
          onClick={handleOnChange}
          subCategories={selectedSubCategoriesById}
          subCategoryFetching={subCategoryFetching}
        />
      ))}
    </Box>
  );
}
