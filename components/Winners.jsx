import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";


const api_url = `${API_KEY}/profile/`;

const Winners = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  // const {logout} = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isFocused && fetchUserInfo();
  }, [isFocused]);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      // console.log("Account New",JSON.parse(access_token))
      const response = await fetch(`${api_url}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(access_token)}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        // console.log(userData)
        setUserInfo(userData);
      } else {
        // Handle error response
        const errorData = await response.json();
        Alert.alert('Error 3', errorData.detail || 'Failed to fetch user info');
      }
    } catch (error) {
      console.error('Fetch User Info Error:', error);
      Alert.alert('Error', 'An error occurred while fetching user info');
    }
    setLoading(false);
  };

  const currentDate = new Date();

  // Define an array of month names
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  // Define an array of day names
  const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  // Extract the date, month, and day
  const date = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const day = dayNames[currentDate.getDay()];

  // Format the date string
  const formattedDate = `${day} \n ${date} ${month}`;

  return (
    (
      loading ?
      
      <View
      style={{
        backgroundColor: '#111',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
      }}>
      {/* <Text>ABCD</Text> */}
      </View>
      :
      <View
      style={{
        backgroundColor: '#111',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
      }}>
        
      <TouchableOpacity
        disabled
        style={{
          flexDirection: 'row',
          // backgroundColor: '#c62828ba',
          // paddingVertical: 1,
          borderRadius: 3,
          // textAlign: 'center',
          alignItems: 'center',
          // justifyContent: 'center',
          // borderWidth: 1,
          borderColor: '#c62828',
        }}
        // onPress={() => navigation.navigate('Shop')}
      >
        <Image source={{uri: `${API_KEY}${userInfo.user_profile}`}} style={{height: 29, width: 29, resizeMode: 'cover',  borderColor: '#fff', borderRadius: 50}} />
        <View style={{marginLeft: 8, marginTop: -4}}>
        <Text
          style={{

            // backgroundColor:'#5a4c27',
            fontFamily: 'MavenPro-Medium',
            color: '#666',

            // textAlign: 'center',
            fontSize: 13,
          }}>
          Buddy
        </Text>
        <Text
          style={{

            // backgroundColor:'#5a4c27',
            fontFamily: 'MavenPro-Medium',
            color: '#f1f1f1',

            // textAlign: 'center',
            fontSize: 13,
          }}>
          {userInfo.displayName}
        </Text>
        </View>
      </TouchableOpacity>
      {/* <Text style={{fontFamily: 'MavenPro-SemiBold', color: '#f1f1f1', fontSize: 10.5}}>{formattedDate}</Text> */}
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          paddingVertical: 3,
          paddingHorizontal: 10,
          backgroundColor: '#222',
          borderWidth: 1,
          borderColor: '#333',
          borderRadius: 3,
          // width: 230,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={require('../assets/DreamUC-DC.png')} style={{height: 15, width: 15, marginTop: 1, resizeMode: 'contain'}} />
        <View style={{ flexDirection: 'row' }}>
          {/* <Text
            style={{
              color: '#fff',
              fontFamily: 'MavenPro-SemiBold',
              fontSize: 12,
              marginLeft: 4,
            }}>
             βGMI
          </Text> */}
          <Text
            style={{
              color: '#f1f1f1',
              fontFamily: 'MavenPro-SemiBold',
              fontSize: 12,
              marginLeft: 4,
            }}>
            Game User ID:
          </Text>
          <Text
            style={{
              color: '#f1f1f1',
              fontFamily: 'MavenPro-SemiBold',
              fontSize: 12,
              marginLeft: 4,
            }}>
            {userInfo.bgmi_id}
          </Text>
        </View>
      </View>
    </View>)
  );
};

export default Winners;
