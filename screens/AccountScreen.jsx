import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  ScrollView,
  ImageBackground
} from 'react-native';
import testuser from '../assets/dp_user.png';
import React, { useEffect, useState } from 'react';
import { ShadowedView } from 'react-native-fast-shadow';
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavbar';
import { useAuth } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_KEY } from "@env";
import Footer from '../components/Footer';
import { launchImageLibrary } from 'react-native-image-picker';
import { format, parseISO } from 'date-fns';
import Achievement from '../components/Achievement';


const api_url = `${API_KEY}`;

const fetchUserInfo = async (setUserInfo, setIsVerified, setLoading, fetchHistory) => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    const response = await fetch(`${api_url}/profile/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${JSON.parse(access_token)}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      fetchHistory();

      if (userData.dob) {
        userData.dob = format(parseISO(userData.dob), 'dd MMMM yyyy');
      }

      setUserInfo(userData);
      if (userData.verifiedUser) {
        setIsVerified(true);
      }
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  } catch (error) {
    console.error('Fetch User Info Error:', error);
  }
  setLoading(true);
};

const fetchHistory = async (setLevel) => {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${api_url}/history/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const data = await response.json();
    setLevel(data.level);
  } catch (error) {
    console.error('Error fetching details:', error);
  }
};

const uploadProfilePicture = async (uri, fetchUserInfo) => {
  try {
    const access_token = await AsyncStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('user_profile', {
      uri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    const response = await fetch(`${api_url}/update-pic/`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${JSON.parse(access_token)}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (response.ok) {
      ToastAndroid.show('Profile picture updated successfully', ToastAndroid.SHORT);
      fetchUserInfo();
    } else {
      const errorData = await response.json();
      console.error('Error updating profile picture:', errorData);
    }
  } catch (error) {
    console.error('Upload Profile Picture Error:', error);
  }
};

const openImagePicker = (setSelectedImage, uploadProfilePicture, fetchUserInfo) => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
      uploadProfilePicture(imageUri, fetchUserInfo);
    }
  });
};

const AccountScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Level, setLevel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (isFocused) fetchUserInfo(setUserInfo, setIsVerified, setLoading, () => fetchHistory(setLevel));
  }, [isFocused]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };


  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <Navbar />
      {loading && !isVerified && <View style={{ backgroundColor: '#000', borderTopColor: '#e2e2e2', borderTopWidth: 0.5, padding: 7, alignItems: 'center' }}>
        <Text style={{ fontSize: 12, fontFamily: 'MavenPro-Regular', color: '#fff' }}>Complete the profile to get 250 DC points 🔥</Text>
      </View>}

      {userInfo && (
        <ScrollView>

          <View style={{ alignItems: 'flex-start' }}>

            <Image source={require('../assets/ProBanner.jpg')} style={{ width: '100%', height: 130, resizeMode: 'cover' }} />
            <View style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }}>
              <Text style={styles.AccountText}>UID: {userInfo.bgmi_id}</Text>
            </View>

            <View style={{ height: 92, width: 92, position: 'relative', top: -70, left: 15, borderRadius: 50 }}>
              <Image
                source={{ uri: `${api_url}${userInfo.user_profile}` }}
                style={{ height: 85, width: 85, resizeMode: 'cover', borderRadius: 50, borderWidth: 2, borderColor: 'white' }}
              />
            </View>


            <View style={{ flexDirection: 'row', position: 'relative', top: -60, left: 18, }}>
              <Text style={{ fontFamily: 'MavenPro-Bold', color: '#000', fontSize: 18, }}>{userInfo.displayName}</Text>
              {isVerified && <Image source={{ uri: `${api_url}${userInfo.verifiedImg}` }} style={{ marginTop: 5.5, marginLeft: 4, height: 15, width: 15, resizeMode: 'contain' }} />}
            </View>
            <Text style={{ fontFamily: 'MavenPro-Medium', color: '#000', fontSize: 14, position: 'relative', top: -55, left: 18, }}>{userInfo.email}</Text>
          </View>

          <View style={{ position: 'relative', top: -45, flexDirection: 'row', justifyContent: 'space-around', padding: 10, paddingLeft: 15, alignItems: 'center', flexWrap: 'wrap', paddingBottom: 13, borderBottomWidth: 1, borderBottomColor: '#f1f1f1' }}>
            <View style={{ backgroundColor: '#f2f2f2', paddingVertical: 4, paddingHorizontal: 7, borderRadius: 10, flexDirection: 'row' }}>
              <Image source={require('../assets/DreamUC-DC.png')} style={{ height: 15, width: 15, resizeMode: 'contain', marginTop: 1, marginRight: 2 }} />
              <Text style={[styles.AccountText, { fontSize: 12, }]}>{userInfo.userpoint}</Text>
            </View>
            {userInfo.bgmi_username && <Text style={[styles.AccountText, { fontSize: 12, backgroundColor: '#f2f2f2', paddingVertical: 4, paddingHorizontal: 7, borderRadius: 10 }]}>{userInfo.bgmi_username}</Text>}
            <Text style={[styles.AccountText, { fontSize: 12, backgroundColor: '#f2f2f2', paddingVertical: 4, paddingHorizontal: 7, borderRadius: 10 }]}>Level: {userInfo.account_level}</Text>
            {userInfo.dob && <Text style={[styles.AccountText, { fontSize: 12, backgroundColor: '#f2f2f2', paddingVertical: 4, paddingHorizontal: 7, borderRadius: 10 }]}>{userInfo.dob}</Text>}
          </View>


          <SafeAreaView style={{ paddingHorizontal: 15, position: 'relative', top: -50, }}>


          </SafeAreaView>
          <View style={{ position: 'relative', top: -40 }}>

            <Footer />

            <View style={{ paddingHorizontal: 15, marginBottom: 30 }}>
              <Text style={{ color: '#444', fontFamily: 'MavenPro-SemiBold', fontSize: 12, }}>SETTINGS -</Text>
              <View style={{ marginTop: 10, rowGap: 7 }}>
                <TouchableOpacity style={{
                  paddingVertical: 8, paddingHorizontal: 5, flexDirection: 'row',
                  borderRadius: 3, borderBottomWidth: 1, borderColor: '#f1f1f1'
                }} onPress={() => navigation.navigate('AccountPut')}>
                  <Icon name="person-circle-outline" size={15} color={'#111'} />
                  <Text style={{ color: '#555', fontFamily: 'MavenPro-Medium', fontSize: 12.5, marginLeft: 7 }}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  paddingVertical: 8, paddingHorizontal: 5, flexDirection: 'row',
                  borderRadius: 3, borderBottomWidth: 1, borderColor: '#f1f1f1'
                }} onPress={() => openImagePicker(setSelectedImage, uploadProfilePicture, () => fetchUserInfo(setUserInfo, setIsVerified, setLoading, () => fetchHistory(setLevel)))}>
                  <Icon name="camera-outline" size={15} color={'#111'} />
                  <Text style={{ color: '#555', fontFamily: 'MavenPro-Medium', fontSize: 12.5, marginLeft: 7 }}>Edit Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  paddingVertical: 8, paddingHorizontal: 5, flexDirection: 'row',
                  borderRadius: 3, borderBottomWidth: 1, borderColor: '#f1f1f1'
                }} onPress={() => navigation.navigate('History')}>
                  <Icon name="diamond-outline" size={15} color={'#111'} />
                  <Text style={{ color: '#555', fontFamily: 'MavenPro-Medium', fontSize: 12.5, marginLeft: 7 }}>Rewards History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  paddingVertical: 8, paddingHorizontal: 5, flexDirection: 'row',
                  borderRadius: 3, borderBottomWidth: 1, borderColor: '#f1f1f1'
                }} onPress={() => navigation.navigate('Help')}>
                  <Icon name="information-circle-outline" size={15} color={'#111'} />
                  <Text style={{ color: '#555', fontFamily: 'MavenPro-Medium', fontSize: 12.5, marginLeft: 7 }}>Help Center</Text>
                </TouchableOpacity>
                <View style={{
                  paddingVertical: 8, paddingHorizontal: 5, 
                  borderRadius: 3, marginTop: 10, backgroundColor: '#f7f7f8',
                }}>
                  <TouchableOpacity onPress={() => handleLogout()} style={{flexDirection: 'row', width: 100}}>
                  <Icon name="log-out-outline" size={15} color={'red'} />
                  <Text style={{ color: 'red', fontFamily: 'MavenPro-Medium', fontSize: 12, marginLeft: 7 }}>LOGOUT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>



            <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontFamily: 'MavenPro-Medium', color: '#555', fontSize: 13 }}>DreamUC Version 1.4.0</Text>
              <Text style={{ fontFamily: 'MavenPro-Medium', color: '#555', fontSize: 12.5 }}>Made in India</Text>
            </View>
          </View>
        </ScrollView>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <BottomNavbar />
      </View>

    </View>
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
    fontFamily: 'MavenPro-Medium',
    fontSize: 14,
    color: '#333',
  },
});

export default AccountScreen;


