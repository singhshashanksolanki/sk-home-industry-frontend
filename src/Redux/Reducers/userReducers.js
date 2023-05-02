import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_IMAGE_FAIL,
  USER_UPDATE_IMAGE_REQUEST,
  USER_UPDATE_IMAGE_SUCCESS,
  USER_EMAIL_RESET_PASSWORD_FAIL,
  USER_EMAIL_RESET_PASSWORD_REQUEST,
  USER_EMAIL_RESET_PASSWORD_SUCCESS,
  USER_EMAIL_RESET_PASSWORD_RESET,
  USER_PASSWORD_RESET_FAIL,
  USER_PASSWORD_RESET_REQUEST,
  USER_PASSWORD_RESET_SUCCESS,
  USER_REGISTER_RESET,
} from "../Constants/UserContants";

// LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// REGISTER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

// SEND MAIL FOR RESET PASSWORD
export const resetPasswordMailReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EMAIL_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case USER_EMAIL_RESET_PASSWORD_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_EMAIL_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_EMAIL_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
    }
  };
  
// USER DETAILS
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

// UPDATE PROFILE
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE IMAGE
export const userUpdateImageReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_IMAGE_REQUEST:
      return { loading: true };
    case USER_UPDATE_IMAGE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// RESET PASSWORD
export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWORD_RESET_REQUEST:
      return { loading: true };
    case USER_PASSWORD_RESET_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_PASSWORD_RESET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
