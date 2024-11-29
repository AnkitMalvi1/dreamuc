import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import testuser from '../assets/dp_user.png';
import React, { useEffect, useState } from 'react';
import { ShadowedView } from 'react-native-fast-shadow';
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavbar';
import { useAuth } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from "@env";
import { ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";


const api_url = `${API_KEY}/`;

const AccountScreenPut = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const navigation = useNavigation();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [bgmiUsername, setBgmiUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bgmi_id, setBgmi_id] = useState('');
  const [account_level, setAccount_level] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${api_url}profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      // console.log(response);

      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
        setDisplayName(userData.displayName);
        setBgmiUsername(userData.bgmi_username);
        setPhone(userData.phone);
        setEmail(userData.email);
        setDob(userData.dob);
        setUpiId(userData.upi_id);
        setBgmi_id(userData.bgmi_id);
        setAccount_level(userData.account_level);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.detail || 'Failed to fetch user info');
      }
    } catch (error) {
      console.error('Fetch User Info Error:', error);
      Alert.alert('Error', 'An error occurred while fetching user info');
    }
  };

  const handleUpdateProfile = async () => {
    try {

      const token = await AsyncStorage.getItem('access_token');
      // console.log(token)
      const response = await fetch(`${api_url}profile-update/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          displayName,
          bgmi_username: bgmiUsername,
          phone,
          email,
          dob : format(dob, 'yyyy-MM-dd'),
          upi_id: upiId,
          bgmi_id,
          account_level,
        }),
      });



      if (response.ok) {
        const updatedUserData = await response.json();
        // console.log(updatedUserData)
        setUserInfo(updatedUserData);
        ToastAndroid.show("Profile updated successfully", ToastAndroid.SHORT);
        // Alert.alert('Success', 'Profile updated successfully');
        navigation.navigate('Account');
      } else {
        const errorData = await response.json();
        
        ToastAndroid.show(errorData.bgmi_username[0], ToastAndroid.SHORT);
      }
    } catch (error) {
      if(error instanceof RangeError){
        ToastAndroid.show('Invalid Date of Birth!', ToastAndroid.LONG);
      }
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };



  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  

  return (
    <ScrollView style={{ backgroundColor: '#fff', height: '100%' }}>
      <Navbar />
      {userInfo && (
        <SafeAreaView style={{ padding: 15 }}>
          <View
            style={{
              padding: 20,
              backgroundColor: '#F5F5F5',
              borderRadius: 5,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#E0E0E0',
            }}>
            <Image style={styles.logo} source={testuser} />
            <View
              style={{
                rowGap: 5,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}>
              <Text style={{ fontFamily: 'MavenPro-Regular', color: '#000' }}>
                Hi, {userInfo.displayName}
              </Text>
              <Text
                style={{
                  fontFamily: 'MavenPro-Medium',
                  color: '#666',
                  fontSize: 13,
                }}>
                {userInfo.bgmi_id}
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 0.6,
              marginVertical: 20,
              borderColor: '#BDBDBD',
              borderRadius: 5,
              backgroundColor: 'white',
              padding: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ rowGap: 25 }}>
              <Text style={styles.AccountText}>Name</Text>
              <Text style={styles.AccountText}>βGMI ID</Text>
              <Text style={styles.AccountText}>βGMI Username</Text>
              <Text style={styles.AccountText}>βGMI ID Level</Text>
              <Text style={styles.AccountText}>Phone</Text>
              <Text style={styles.AccountText}>Email</Text>
              <Text style={styles.AccountText}>Date of Birth</Text>
              <Text style={styles.AccountText}>UPI ID (for redeem)</Text>
            </View>
            <View style={{ rowGap: 15.5 }}>
              <TextInput
                style={styles.AccountTextInput}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder='Mr. Dynamox'
                placeholderTextColor={'#9E9E9E'}
                inputMode='text'
              />
              <TextInput
                style={styles.AccountTextInput}
                value={bgmi_id}
                onChangeText={setBgmi_id}
                placeholder='51234567890'
                placeholderTextColor={'#9E9E9E'}
                inputMode='numeric'
              />
              <TextInput
                style={styles.AccountTextInput}
                value={bgmiUsername}
                onChangeText={setBgmiUsername}
                placeholder='Mr. Dynamox'
                placeholderTextColor={'#9E9E9E'}
                inputMode='text'
              />
              <TextInput
                style={styles.AccountTextInput}
                value={account_level.toString()}
                onChangeText={setAccount_level}
                placeholder='30'
                placeholderTextColor={'#9E9E9E'}
                inputMode='numeric'
              />
              <TextInput
                style={styles.AccountTextInput}
                value={phone}
                onChangeText={setPhone}
                placeholder='87XXXXXXX0'
                placeholderTextColor={'#9E9E9E'}
                inputMode='numeric'
              />
              <TextInput
                style={styles.AccountTextInput}
                value={email}
                onChangeText={setEmail}
                placeholder='user@gmail.com'
                readOnly
                placeholderTextColor={'#9E9E9E'}
              />

              <TouchableOpacity onPress={() =>
                setShow(true)
              }>
                {/* <Text style={styles.AccountText}>Date of Birth</Text> */}

                <Text
                  style={[styles.AccountTextInput, {paddingVertical: 4}]}
                >

                 { dob =="" || dob == null ? '2025-12-01' :format(dob, 'yyyy-MM-dd')} 
                </Text>
              </TouchableOpacity>




              <TextInput
                style={styles.AccountTextInput}
                value={upiId}
                onChangeText={setUpiId}
                placeholder='Enter UPI ID'
                placeholderTextColor={'#9E9E9E'}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}

                />
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', columnGap: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#20c997',
                  borderRadius: 5,
                  paddingVertical: 4,
                  alignItems: 'center',
                  height: 25,
                  width: 90,
                }}
                onPress={handleUpdateProfile}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'MavenPro-Medium',
                  }}>
                  Save Changes
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#000000',
                  borderRadius: 5,
                  paddingVertical: 4,
                  alignItems: 'center',
                  height: 25,
                  width: 61,
                }}
                disabled>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'MavenPro-Medium',
                  }}>
                  Edit Pic
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </SafeAreaView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  AccountText: {
    fontFamily: 'MavenPro-Regular',
    fontSize: 14,
    color: '#333',
  },
  AccountTextInput: {
    fontFamily: 'MavenPro-Regular',
    fontSize: 14,
    color: '#333',
    backgroundColor: 'whitesmoke',
    padding: 0,
    paddingLeft: 10,
  },
});

export default AccountScreenPut;
