import { createContext, useReducer, useEffect, Dispatch } from 'react';
import * as React from 'react'

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export type AuthAction = {
  type: 'LOGIN' | 'LOGOUT';
  payload: any;
};

export type AuthContextState = {
  user: any;
};

export type AuthContextDispatch = Dispatch<AuthAction>;

export const AuthContext = createContext<{
  state: AuthContextState;
  dispatch: AuthContextDispatch;
}>({
  state: { user: null },
  dispatch: () => null,
});

export const authReducer = (state: AuthContextState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
