import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '@env';
import SettingsContext from '../SettingsContext';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import DailyCoupon from '../components/DailyCoupon';


const api_url = `${API_KEY}/`;

const MiningScreen = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(0);
  const [collected, setCollected] = useState(false);
  const { setUserpoint } = useContext(SettingsContext);
  const [reload, setReload] = useState(false);
  const [FirstLoad, setFirstLoad] = useState(true);

  const collectCount = (newCount) => {
    let currentCount = 0;
    const interval = setInterval(() => {
      if (currentCount < newCount) {
        currentCount++;
        setCount(currentCount);
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed of the animation here
  };

  useEffect(() => {
    fetchCount();
  }, [reload]);

  const fetchCount = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${api_url}daily-check/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();
      setFirstLoad(false);

      if (FirstLoad) {
        setCollected(data.dlst);
        // console.log('FirstLoad ==>>>>', FirstLoad);
      } else {
        setTimeout(() => {
          setCollected(data.dlst);
          // console.log('data.dlst', data.dlst);
        }, 1500);
      }

      setUserpoint(data.user.userpoint);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  const handleClaim = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${api_url}daily-check/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();
      collectCount(data.point); // Trigger animation
      setReload(true);
      ToastAndroid.show(`You've collected: ${data.point} DC Points`, ToastAndroid.LONG)
    } catch (error) {
      console.error('Error claiming points:', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <Navbar />
      {FirstLoad ? (
        <View style={{ paddingTop: 10, paddingHorizontal: 10, marginTop: 5 }}>
          <ContentLoader
            backgroundColor="#eaedf1"
            foregroundColor="#fafafa" height={150}>
            <Rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
          </ContentLoader>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 10 }}>
          <View
            style={{
              backgroundColor: '#f9ead5',
              height: 150,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#fdc06f',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View>
              <Image
                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                source={require('../assets/treasure.png')}
              />
            </View>
            <View
              style={{
                height: '100%',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'black', fontFamily: 'MavenPro-SemiBold' }}>
                Daily Check-in
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#FAFAFA',
                  paddingVertical: 10,
                  paddingHorizontal: 30,
                  borderWidth: 1,
                  borderRadius: 7,
                  borderColor: '#EEEEEE',
                }}>
                <Text style={{ fontSize: 20, fontFamily: 'MavenPro-SemiBold', color: '#555' }}>
                  {collected ? 'Collected' : count}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  backgroundColor: `${!collected ? '#45ce5c' : '#FFCC80'}`,
                  paddingVertical: 5,
                  paddingHorizontal: 25,
                  borderRadius: 5,
                }}
                onPress={handleClaim}
                disabled={collected}>
                <Text style={{ color: 'white', fontFamily: 'MavenPro-SemiBold' }}>
                  Claim
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      
      <DailyCoupon />


    </View>
  );
};

const styles = StyleSheet.create({
  coinIcon: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  rightArrow: {
    width: 15,
    height: 15,
  },
});

export default MiningScreen;
