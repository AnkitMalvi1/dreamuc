import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import testuser from '../assets/dp_user.png';
import { ShadowedView } from 'react-native-fast-shadow';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_KEY} from "@env";
import SettingsContext from '../SettingsContext';


const api_url = `${API_KEY}/`;

const Navbar = () => {
  const navigation = useNavigation();
  const { settings, userpoint } = useContext(SettingsContext);

  
  return (
    <ShadowedView
      style={{
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
          width: 0,
          height: 1,
        },
      }}>
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          {/* <Image style={styles.logo} source={testuser} /> */}
        {/* <Icon name="menu-outline" size={10} color={'#222'} style={{position: 'relative', right: 20,  top:10, zIndex: 1, backgroundColor: '#fff', borderRadius: 10,paddingHorizontal: 2, paddingVertical: 2}} /> */}
          <Image source={require('../assets/DreamUC.png')} style={{ width: 130, height: 25, resizeMode: 'contain' }} />
        </View>
        <View style={styles.coinsNotificationContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Redeem');
            }}>
            <View style={styles.coinContainer}>
              <Image
                source={{uri: `${api_url}${settings.dc_coin}`}} 
                style={styles.coinIcon}
              />
              <View style={styles.coinCountContainer}>
                <Text style={styles.coinCount}>{userpoint}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notifyButton} onPress={() => navigation.navigate('Notification')}>
            <Icon name="notifications-outline" size={20} color={'#fff'} style={styles.notifyIcon} />
            {/* <View style={styles.notifyBadge}>
              <Text style={styles.badgeText}></Text>
            </View> */}
          </TouchableOpacity>
          {/* <Button
            title="Go to Details"
            onPress={() => navigation.navigate('Details')}
          /> */}
        </View>
      </View>
    </ShadowedView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 17,
    paddingHorizontal: 14,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  coinsNotificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#282c3fc2',
    marginRight: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
  },
  coinIcon: {
    width: 14,
    height: 14,
    marginRight: 3,
  },
  coinCount: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'MavenPro-SemiBold',
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'MavenPro-SemiBold',
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifyIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  notifyBadge: {
    backgroundColor: 'red', // Example badge background color
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 7,
    height: 7,
    position: 'absolute',
    top: -2,
    right: 11,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'MavenPro-SemiBold',
  },
});

export default Navbar;
