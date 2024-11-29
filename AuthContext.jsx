import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ToastAndroid } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from "@env";
import ErrorScreen from './screens/ErrorScreen';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [refreshError, setRefreshError] = useState(null);
  

 const login = async ({email, password}) => {
  setLoading(true);
  try {
    const response = await fetch(`${API_KEY}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data.data)

      const Token ={
        token: data.data.access,
        access_token: data.data.access
      }
      await AsyncStorage.setItem('refresh_token', JSON.stringify(data.data.refresh));
      await AsyncStorage.setItem('access_token', JSON.stringify(data.data.access));
      setIsLoggedIn(true);
      // navigation.replace('Home');
    } else {
      const errorData = await response.json();
      setError(errorData)
      // console.log(errorData)
      // Alert.alert('Error 1', errorData.error || 'Invalid credentials');
      ToastAndroid.show('Invalid email or password, Try again!', ToastAndroid.LONG);
    }
  } catch (error) {
    console.error('Login Error:', error);
  }
  setLoading(false);
 }


 const RefreshToken = async () => {
  setLoading(true);
  try {
    const refresh_token = JSON.parse(await AsyncStorage.getItem('refresh_token'));
    const response = await fetch(`${API_KEY}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refresh_token,
      }),
    });

    const data = await response.json();
    // console.log("data Received", data);
    setError(null);
    if (response.ok) {
      await AsyncStorage.setItem('refresh_token', JSON.stringify(data.refresh));
      await AsyncStorage.setItem('access_token', JSON.stringify(data.access));
      setIsLoggedIn(true);
    } else if (response.status === 401) {
      // console.log("Unauthorized access");
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('access_token');
      setIsLoggedIn(false);
      return false;
    } else {
      // Handle other response statuses if needed
      // console.log("first")
    }
  } catch (error) {
    setRefreshError(error.message);
    console.error('Error refreshing token:', error);
  } finally {
    setLoading(false);
  }
}




if (refreshError) {
  return <ErrorScreen errorMessage={refreshError} />;
}
  


 

  // const login = () => setIsLoggedIn(true);
  // const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{isLoggedIn, login, setIsLoggedIn, error, loading, RefreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
