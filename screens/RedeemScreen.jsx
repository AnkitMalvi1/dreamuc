import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { ShadowedView } from 'react-native-fast-shadow';
import BottomNavbar from '../components/BottomNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { API_KEY } from "@env";
import SettingsContext from '../SettingsContext';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { useNavigation } from '@react-navigation/native';


const BASE_URL = `${API_KEY}`;

const RedeemScreen = () => {
  const [redeems, setRedeems] = useState([])
  const { userpoint, setUserpoint, settings, fetchRedeemCoins } = useContext(SettingsContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    fetchRedeems();
  }, []);

  const fetchRedeems = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${BASE_URL}/redeems/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRedeems(data)
        // console.log(data)
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error('Fetch User Info Error:', error);
    }
    setLoading(false);
  };

  const postRedeems = async () => {
    // console.log('Posting')
    try {
      const token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${BASE_URL}/payment/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({ id: selectedItem.id })
      });

      const data = await response.json();
      if (response.ok) {
        fetchRedeemCoins();
        ToastAndroid.show('payment request sent succesfully', ToastAndroid.SHORT);
      } else if (response.status === 402) {
        // console.log(data)
        ToastAndroid.show(data.error, ToastAndroid.SHORT);
      }

      else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error('Fetch User Info Error:', error);
    }
  };


  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    // console.log(item); 
  };

  const dcPoints = userpoint;

  const convertToRupees = (dc) => {
    return dc / (settings.dc_coin_prize);
  };

  const windowHeight = Dimensions.get('window').height;
  const height80Percent = Math.floor(windowHeight * 0.90);


  return (
    <>

      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <Navbar />
        <ScrollView>
          <View style={{ marginTop: 10, padding: 10, }}>
            <ShadowedView
              style={{
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
              }}>
              <View
                style={{
                  height: 80,
                  backgroundColor: '#fff',
                  borderColor: '#f1f1f114',
                  borderWidth: 0.6,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    style={{
                      height: 17,
                      width: 17,
                      resizeMode: 'cover',
                      marginRight: 4,
                    }}
                    source={require('../assets/trophy.png')}
                  />
                  <Text style={{ fontSize: 13, color: '#000', fontFamily: 'MavenPro-SemiBold' }}>Your Winnings</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    height: '60%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: `${BASE_URL}${settings.dc_coin}` }} // Replace this with your image path
                      style={{
                        width: 22,
                        height: 22,
                        resizeMode: 'contain',
                        marginRight: 4,
                        marginTop: 4,
                      }}
                    />
                    <Text style={{ fontSize: 24, color: '#222', fontFamily: 'MavenPro-SemiBold' }}>
                      {userpoint}
                    </Text>
                  </View>
                </View>
              </View>
            </ShadowedView>
          </View>

          <View style={{ marginTop: 10, paddingHorizontal: 10, rowGap: 10 }}>
            <Text style={{ fontSize: 16, fontFamily: 'MavenPro-SemiBold', color: '#757575' }}>Send Winnings to</Text>
          </View>

          {loading ?
            <View style={{
              paddingHorizontal: 10,
            }}>
              <ContentLoader
                backgroundColor="#eaedf1"
                foregroundColor="#fafafa"
                width={'100%'}
                height={268}>
                <Rect x="1" y="11" rx="0" ry="0" width="179" height="118" />
                <Rect x="190" y="140" rx="0" ry="0" width="178" height="118" />
                <Rect x="1" y="140" rx="0" ry="0" width="179" height="118" />
                <Rect x="190" y="11" rx="0" ry="0" width="178" height="118" />

              </ContentLoader>
            </View>
            :
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 10,
                rowGap: 10,
              }}>
              {redeems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleSelectItem(item)}
                  style={{
                    width: '31%',
                    backgroundColor: selectedItem === item ? '#FFECB3' : '#F5F5F5', // Change background color of selected item
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    rowGap: 7,
                    paddingBottom: 15,
                    borderWidth: 1.5,
                    borderColor: selectedItem === item ? '#FFB300' : 'transparent',
                  }}>
                  <Image
                    source={{ uri: `${BASE_URL}${item.image}` }}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'cover',
                      marginTop: 10,
                    }}
                  />
                  <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#757575', fontSize: 12, textAlign: 'center' }}>{item.name}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: '#fff',
                      paddingVertical: 1,
                      paddingHorizontal: 5,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: `${BASE_URL}${item.coin_img}` }}
                      style={styles.coinIcon}
                    />
                    <Text style={{ fontSize: 12, fontFamily: 'MavenPro-SemiBold', color: '#757575' }}>{item.redeem_coin}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          }


          <View style={{ padding: 10 }}>
            <Button title="REDEEM NOW" disabled={!selectedItem ? true : false} color={'orange'} onPress={postRedeems} />
          </View>
        </ScrollView>

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
    </>
  );
};

const styles = StyleSheet.create({
  coinIcon: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
});

export default RedeemScreen;
