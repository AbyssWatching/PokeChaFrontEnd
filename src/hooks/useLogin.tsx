import { useState, useContext } from 'react';
import { useAuthContext, User } from './useAuthContext';

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResult {
  login: (props: LoginProps) => Promise<void>;
  isLoading: boolean | null;
  error: string | null;
}

export const useLogin = (): LoginResult => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = useContext(useAuthContext);

  const login = async ({ email, password }: LoginProps): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('https://PokeCha-api.onrender.com/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

