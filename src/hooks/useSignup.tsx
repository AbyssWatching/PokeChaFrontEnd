import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

interface User {
  [key: string]: any;
}

interface SignupResponse {
  error?: string;
  [key: string]: any;
}

export const useSignup = (): [
  string | null, 
  boolean, 
  (email: string, password: string) => Promise<void>
] => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('https://PokeCha-api.onrender.com/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password }),
    });
    const json: SignupResponse = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError('error');
    }
    if (response.ok) {
      const user: User = json;

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(user));

      // update the auth context
      dispatch({type: 'LOGIN', payload: user});

      // update loading state
      setIsLoading(false);
    }
  };

  return [error, isLoading, signup];
};
