import React, { createContext, useReducer, useEffect } from 'react';

interface AuthState {
  user: object | null;
}

interface Action {
  type: string;
  payload: object;
}

const initialState: AuthState = {
  user: null,
};

export const AuthContext = createContext({});

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
