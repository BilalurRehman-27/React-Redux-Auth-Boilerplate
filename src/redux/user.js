import axios from 'axios';
import ACTIONS from './app.constants';
const BASE_URL = 'http://www.posns.somee.com/api';
// Reducer

const initialState = {
  profileName: null,
  isLoggedIn: false,
  isFetching: false,
  jwt: null,
  loginError: null,
  signupError: null,
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return {
        ...state,
        profileName: action.payload.username,
        isLoggedIn: true,
        isFetching: false,
        jwt: action.payload.jwt,
        loginError: null,
      };
    case ACTIONS.LOG_OUT: {
      return initialState;
    }
    case ACTIONS.SIGN_IN:
      return {
        ...state,
        isFetching: true,
        loginError: null,
      };
    case ACTIONS.SIGN_UP:
      return {
        ...state,
        isFetching: true,
        signupError: null,
      };
    case ACTIONS.SIGN_UP_COMPLETE:
      return {
        ...state,
        isFetching: false,
        signupError: null,
      };
    case ACTIONS.SET_LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        loginError: action.payload.error,
      };
    case ACTIONS.SET_SIGNUP_ERROR:
      return {
        ...state,
        isFetching: false,
        signupError: action.payload.error,
      };

    case ACTIONS.GET_MAIN_CATEGORIES.PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.GET_MAIN_CATEGORIES.SUCCESS:
      const formattedCategories = action.data.map((item) => {
        return {
          id: item.descriptionCode,
          name: item.description,
        };
      });

      return {
        ...state,
        isFetching: false,
        mainCategories: { name: 'Main Category', data: formattedCategories },
      };
    case ACTIONS.GET_MAIN_CATEGORIES.ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };

    case ACTIONS.GET_TABLES.PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.GET_TABLES.SUCCESS:
      const formattedTablesList = action.data.map((item) => {
        return {
          ...item,
          id: item.tableCode,
        };
      });
      return {
        ...state,
        isFetching: false,
        tables: { name: 'Tables', data: formattedTablesList },
      };
    case ACTIONS.GET_TABLES.ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };

    case ACTIONS.GET_WAITERS.PENDING:
      return {
        ...state,
        isFetching: true,
      };
    case ACTIONS.GET_WAITERS.SUCCESS:
      const formattedWaitersList = action.data.map((item) => {
        return {
          ...item,
          id: item.empNo,
        };
      });
      return {
        ...state,
        isFetching: false,
        waiters: { name: 'Waiters', data: formattedWaitersList },
      };
    case ACTIONS.GET_WAITERS.ERROR:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default currentUser;

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
      `http://www.posns.somee.com/api/Login?userName=${userObj.username}&password=${userObj.password}`,
      {},
      {
        headers: { 'Content-Security-Policy': 'upgrade-insecure-requests' },
      }
    )
    .then(function (response) {
      // handle success
      if (response.data) {
        dispatch(
          setUser({
            username: userObj.username,
            jwt: response.data.jwt,
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
        type: ACTIONS.ACTIONS.GET_MAIN_CATEGORIES.ERROR,
        loading: false,
        error: true,
      });
    })
    .then(function () {
      // always executed
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
        type: ACTIONS.ACTIONS.GET_TABLES.ERROR,
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
        type: ACTIONS.ACTIONS.GET_WAITERS.ERROR,
        loading: false,
        error: true,
      });
    })
    .then(function () {
      // always executed
    });
};

const logOut = () => {
  return {
    type: ACTIONS.LOG_OUT,
  };
};

// const getMainCategoriesBegin = () => {
//   return {
//     type: ACTIONS.GET_MAIN_CATEGORIES,
//   };
// };

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
};
