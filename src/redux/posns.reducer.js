import ACTIONS from './app.constants';
const initialState = {
  profileName: null,
  isLoggedIn: false,
  isFetching: false,
  jwt: null,
  loginError: null,
  signupError: null,
  selectedItems: [],
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

    case ACTIONS.GET_SUBCATEGORIES_BY_ID.PENDING:
      return {
        ...state,
        subCategories: {
          ...state.subCategories,
          subCategoryFetching: true,
        },
      };
    case ACTIONS.GET_SUBCATEGORIES_BY_ID.SUCCESS:
      const formattedSubCategories = action.data.map((item) => {
        return {
          ...item,
          id: item.itemCode,
        };
      });

      return {
        ...state,
        subCategories: {
          ...state.subCategories,
          subCategoryFetching: false,
          name: 'SubCategories',
          categoryId: action.categoryId,
          [action.categoryId]: formattedSubCategories,
        },
      };
    case ACTIONS.GET_SUBCATEGORIES_BY_ID.ERROR:
      return {
        ...state,
        subCategories: {
          subCategoryFetching: false,
        },
        isError: true,
      };

    case ACTIONS.SET_SELECTED_CATEGORY_ID: {
      return {
        ...state,
        selectedCategory: action.id,
      };
    }

    case ACTIONS.SET_SELECTED_SUB_CATEGORY_ITEM: {
      const selectedItems = state.selectedItems.concat(action.subCategoryItem);
      const currentItem = action.subCategoryItem;

      const uniqueList = [
        ...new Map(selectedItems.map((item) => [item['id'], item])).values(),
      ];

      const prevQuantity =
        uniqueList.find((item) => item.id === currentItem.id).quantity ?? 0;

      uniqueList.find((item) => item.id === currentItem.id).quantity =
        prevQuantity + 1;

      return {
        ...state,
        selectedItems: uniqueList,
      };
    }
    case ACTIONS.SET_ITEM_QUANTITY: {
      const updatedList = state.selectedItems;
      updatedList.find((item) => item.id === action.rowId).quantity =
        action.quantity;
      return {
        ...state,
        selectedItems: updatedList,
      };
    }
    default:
      return state;
  }
};

export default currentUser;
