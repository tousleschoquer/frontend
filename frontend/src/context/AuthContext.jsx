// AuthContext.js

import React, { createContext, useReducer, useEffect } from 'react';

// Define the shape of the context value
const AuthContext = createContext({
  user: null,
  token: null,
  dispatch: () => {},
});

// Define the shape of an authentication action
const AuthActionType = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

// Define the reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return { ...state, user: action.payload.user, token: action.payload.token };
    case AuthActionType.LOGOUT:
      return { ...state, user: null, token: null };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  token: null,
  dispatch: () => {},
};

// AuthContextProvider component
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userString && token) {
      const user = JSON.parse(userString);
      dispatch({ type: AuthActionType.LOGIN, payload: { user, token } });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider, AuthActionType };
