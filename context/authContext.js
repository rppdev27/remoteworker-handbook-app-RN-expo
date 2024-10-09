import { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const CREDENTIAL = {
    valid_email: 'rppdev27@gmail.com',
    valid_password: 'password123'
  };

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      setToken(userToken);
    } catch (error) {
      console.log('Failed to fetch the token from storage', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    if (CREDENTIAL.valid_email === email && CREDENTIAL.valid_password === password) {
      try {
        await AsyncStorage.setItem('userToken', email);
        setToken(email);
        console.log('Login success');
        return true;
      } catch (error) {
        console.log('Failed to store the token', error);
        return false;
      }
    } else {
      console.log('Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      console.log('Logout success');
    } catch (error) {
      console.log('Failed to remove the token', error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, isLoading, login, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};