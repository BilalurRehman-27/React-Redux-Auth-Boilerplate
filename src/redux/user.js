import axios from 'axios';
import ACTIONS from './app.constants';

//For Nisa Sultan Gulber
// const BASE_URL = 'https://192.168.10.2:8443/api';
const BASE_URL = 'https://192.168.10.201:8443/api';
//For Nisa Sultan Johar Town
//const BASE_URL = 'https://192.168.18.2:8443/api';

// const BASE_URL = 'http://192.168.10.2:8080/api';
//const BASE_URL = 'https://www.posns.somee.com/api';

// Action Creators
const setUser = (userObj) => {
  return {
    type: ACTIONS.SET_USER,
    payload: userObj,
  };
  
};

const setLoginError = (error) => {
  return {
    type: ACTIONS.SET_LOGIN_ERROR,
    payload: { error },
  };
};

const setSignupError = (error) => {
  return {
    type: ACTIONS.SET_SIGNUP_ERROR,
    payload: { error },
  };
};

const signIn = (userObj) => (dispatch) => {
  dispatch({
    type: ACTIONS.SIGN_IN,
  });
  axios
    .post(
      `${BASE_URL}/Login?userName=${userObj.username}&password=${userObj.password}`,
      {},
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      }
    )
    .then(function (response) {
      // handle success
      if (response.data) {
        dispatch(
          setUser({
            username: response.data.fullName,
            userId: response.data.userId,
          })
        );
      } else {
        dispatch(setLoginError('Incorrect username or password'));
      }
    })
    .catch(function (error) {
      // handle error
      let errorMessage = 'Network Error';
      if (error.response) {
        errorMessage = error.response.data.message;
        errorMessage =
          errorMessage === 'WRONG_CREDENTIAL'
            ? 'Incorrect username or password'
            : errorMessage;
        //User does not exist. Sign up for an account
      }
      dispatch(setLoginError(errorMessage));
    })
    .then(function () {
      // always executed
    });
};

const signUp = (userObj) => (dispatch) => {
  dispatch({
    type: ACTIONS.SIGN_UP,
  });
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/user/register ',
    data: {
      username: userObj.username,
      password: userObj.password,
    },
  })
    .then(function (response) {
      // handle success
      if (response.data.userId) {
        dispatch({
          type: ACTIONS.SIGN_UP_COMPLETE,
        });
        dispatch(signIn(userObj)); //Auto login on successful register
      }
    })
    .catch(function (error) {
      // handle error
      let errorMessage = 'Network Error';
      if (error.response) {
        errorMessage = error.response.data.message;
        errorMessage =
          errorMessage === 'USERNAME_IS_NOT_AVAILABLE'
            ? 'Username/Email is not available'
            : errorMessage;
      }
      dispatch(setSignupError(errorMessage));
    })
    .then(function () {
      // always executed
    });
};

const getMainCategoriesBegin = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_MAIN_CATEGORIES_BEGIN,
  });
  dispatch({
    type: ACTIONS.GET_MAIN_CATEGORIES.PENDING,
    loading: true,
  });
  axios({
    method: 'get',
    url: `${BASE_URL}/Catagories`,
  })
    .then(function (response) {
      dispatch({
        type: ACTIONS.GET_MAIN_CATEGORIES.SUCCESS,
        loading: false,
        data: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.GET_MAIN_CATEGORIES.ERROR,
        loading: false,
        error: true,
      });
    });
};

const getTablesBegin = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_TABLES_BEGIN,
  });
  dispatch({
    type: ACTIONS.GET_TABLES.PENDING,
    loading: true,
  });
  axios({
    method: 'get',
    url: `${BASE_URL}/Tables`,
  })
    .then(function (response) {
      dispatch({
        type: ACTIONS.GET_TABLES.SUCCESS,
        loading: false,
        data: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.GET_TABLES.ERROR,
        loading: false,
        error: true,
      });
    })
    .then(function () {
      // always executed
    });
};

const getWaitersBegin = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_WAITERS_BEGIN,
  });
  dispatch({
    type: ACTIONS.GET_WAITERS.PENDING,
    loading: true,
  });
  axios({
    method: 'get',
    url: `${BASE_URL}/Waiters`,
  })
    .then(function (response) {
      dispatch({
        type: ACTIONS.GET_WAITERS.SUCCESS,
        loading: false,
        data: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.GET_WAITERS.ERROR,
        loading: false,
        error: true,
      });
    })
    .then(function () {
      // always executed
    });
};

const getSalesPersonBegin = () => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_SALES_PERSON_BEGIN,
  });
  dispatch({
    type: ACTIONS.GET_SALES_PERSON.PENDING,
    loading: true,
  });
  axios({
    method: 'get',
    url: `${BASE_URL}/SalePerson`,
  })
    .then(function (response) {
      dispatch({
        type: ACTIONS.GET_SALES_PERSON.SUCCESS,
        loading: false,
        data: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.GET_SALES_PERSON.ERROR,
        loading: false,
        error: true,
      });
    });
};

const getOrdersByLoggedInWaiter = (waiterId, selectedDate) => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_ORDER_DETAILS_BEGIN,
  });

  dispatch({
    type: ACTIONS.GET_ORDER_BY_WAITER_ID.PENDING,
    loading: true,
  });
  axios({
    method: 'get',
    url: `${BASE_URL}/GetOrdersByWaiterId/${waiterId}?date=${selectedDate}`,
  })
    .then(function (response) {
      dispatch({
        type: ACTIONS.GET_ORDER_BY_WAITER_ID.SUCCESS,
        loading: false,
        data: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.GET_ORDER_BY_WAITER_ID.ERROR,
        loading: false,
        error: true,
      });
    });
};

const getOrderDetails = (orderNo) => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_ORDER_DETAILS_BEGIN,
  });
  dispatch({
    type: ACTIONS.GET_ORDER_DETAILS.PENDING,
    loading: true,
  });
  axios({
    method: 'get',
    url: `${BASE_URL}/GetOrderDetails/${orderNo}`,
  })
    .then(function (response) {
      dispatch({
        type: ACTIONS.GET_ORDER_DETAILS.SUCCESS,
        loading: false,
        data: response.data,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.GET_ORDER_DETAILS.ERROR,
        loading: false,
        error: true,
      });
    });
};

const getSubCategoriesByIdBegin = (id, selectedCategoryId) => (dispatch) => {
  dispatch({
    type: ACTIONS.GET_SUBCATEGORIES_BY_ID_BEGIN,
  });
  dispatch({
    type: ACTIONS.SET_SELECTED_CATEGORY_ID,
    id: selectedCategoryId,
  });
  dispatch({
    type: ACTIONS.GET_SUBCATEGORIES_BY_ID.PENDING,
    loading: true,
  });
  axios({
    method: 'get',
    url: `${BASE_URL}/Items/${id}`,
  })
    .then(function (response) {
      dispatch({
        type: ACTIONS.GET_SUBCATEGORIES_BY_ID.SUCCESS,
        loading: false,
        data: response.data,
        categoryId: id,
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.GET_SUBCATEGORIES_BY_ID.ERROR,
        loading: false,
        error: true,
      });
    })
    .then(function () {
      // always executed
    });
};

export const setSelectedCategory = (id) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_SELECTED_CATEGORY_ID,
    id,
  });
};

export const setSelectedSubCategoryItems = (subCategoryItem) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_SELECTED_SUB_CATEGORY_ITEM,
    subCategoryItem,
  });
};

export const saveOrderBegin = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.SAVE_ORDER_BEGIN,
  });
  dispatch({
    type: ACTIONS.SAVE_ORDER.PENDING,
    loading: true,
  });
  axios
    .post(`${BASE_URL}/Save`, payload)
    .then(function (response) {
      dispatch({
        type: ACTIONS.SAVE_ORDER.SUCCESS,
        loading: false,
        data: response.data,
      });

      dispatch(actions.setEditMode(false));
      setTimeout(() => {
        dispatch({
          type: ACTIONS.RESET_NOTIFICATION,
          isOrderSaved: false,
        });
        dispatch({
          type: ACTIONS.RESET_ORDER_NO,
        });
        dispatch(actions.getTablesBegin());
      }, 3000);
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.SAVE_ORDER.ERROR,
        loading: false,
        error: true,
      });
    });
};

export const updateOrderBegin = (payload) => (dispatch) => {
  dispatch({
    type: ACTIONS.UPDATE_ORDER_BEGIN,
  });
  dispatch({
    type: ACTIONS.UPDATE_ORDER.PENDING,
    loading: true,
  });
  axios
    .post(`${BASE_URL}/UpdateOrder`, payload)
    .then(function (response) {
      dispatch({
        type: ACTIONS.UPDATE_ORDER.SUCCESS,
        loading: false,
        data: response.data,
      });
      dispatch(actions.setEditMode(false));
      setTimeout(() => {
        dispatch({
          type: ACTIONS.RESET_NOTIFICATION,
          isOrderSaved: false,
        });
      }, 3000);
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);
      dispatch({
        type: ACTIONS.UPDATE_ORDER.ERROR,
        loading: false,
        error: true,
      });
    });
};

export const setItemsQuantity =
  (quantity = 0, rowId) =>
  (dispatch) => {
    dispatch({
      type: ACTIONS.SET_ITEM_QUANTITY,
      quantity,
      rowId,
    });
  };

export const resetState = () => (dispatch) => {
  dispatch({
    type: ACTIONS.RESET_STATE,
  });
};

export const setRemarks = (remarks) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_REMARKS,
    remarks,
  });
};

export const setSelectedSalePerson = (salePersonId) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_SELECTED_WAITER,
    salePersonId,
  });
};

export const setSelectedTable = (tableId) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_SELECTED_TABLE,
    tableId,
  });
};

export const deleteSelectedItem = (item) => (dispatch) => {
  dispatch({
    type: ACTIONS.DELETE_SELECTED_ITEM,
    item,
  });
};

export const setEditMode = (isEdit) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_EDIT_MODE,
    data: isEdit,
  });
};

const logOut = () => {
  return {
    type: ACTIONS.LOG_OUT,
  };
};

export const actions = {
  setUser,
  logOut,
  signIn,
  signUp,
  setLoginError,
  setSignupError,
  getMainCategoriesBegin,
  getTablesBegin,
  getWaitersBegin,
  getSalesPersonBegin,
  getSubCategoriesByIdBegin,
  setSelectedCategory,
  setSelectedSubCategoryItems,
  setItemsQuantity,
  setRemarks,
  setSelectedSalePerson,
  setSelectedTable,
  saveOrderBegin,
  deleteSelectedItem,
  getOrdersByLoggedInWaiter,
  getOrderDetails,
  setEditMode,
  updateOrderBegin,
  resetState,
};
