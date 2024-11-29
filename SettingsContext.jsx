import React, { createContext, useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY} from "@env";


const api_url = `${API_KEY}`;

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [userpoint, setUserpoint] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    fetchUserInfo();
    fetchRedeemCoins();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${api_url}/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(access_token)}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data.settings);
        
      } else {
        // Handle error response
        const errorData = await response.json();
        
      }
    } catch (error) {
      console.error('Fetch User Info Error:', error);
      
    }
  };

  const fetchRedeemCoins = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${api_url}/profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUserpoint(userData.userpoint);
        setProfilePic(userData.user_profile);
        // console.log(userData.userpoint)
      } else {
        // Handle error response
        const errorData = await response.json();
       
      }
    } catch (error) {
      console.error('Fetch User Info Error:', error);
      
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, userpoint, setUserpoint, fetchRedeemCoins, profilePic }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
