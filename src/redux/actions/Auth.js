import {
  SIGNIN,
  AUTHENTICATED,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SHOW_AUTH_MESSAGE,
  HIDE_AUTH_MESSAGE,
  SHOW_LOADING,
  HIDE_LOADING,
  SAVE_LOCATION,
  SET_USER_DATA,
  SAVE_CATEGORIES,
  SAVE_CATEGORY
} from '../constants/Auth';

export const signIn = (user) => {
  return {
    type: SIGNIN,
    payload: user
  }
};

export const authenticated = (data) => {
  return {
    type: AUTHENTICATED,
    payload: data ? data?.payload : null
  }
};

export const signOut = () => {
  return {
    type: SIGNOUT
  };
};


export const signOutSuccess = () => {
  return {
    type: SIGNOUT_SUCCESS,
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_AUTH_MESSAGE,
    message
  };
};

export const hideAuthMessage = () => {
  return {
    type: HIDE_AUTH_MESSAGE,
  };
};

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: HIDE_LOADING,
  };
};

export const saveLocation = (payload) => {
  return {
    type: SAVE_LOCATION,
    payload
  };
};


export const saveUserData = (data) => {
  return {
    type: SET_USER_DATA,
    payload: data
  }
}

export const saveCategories = (data) => {
  return {
    type: SAVE_CATEGORIES,
    categories: data
  }
}

export const saveCategory = (data) => {
  return {
    type: SAVE_CATEGORY,
    category : data
  }
}