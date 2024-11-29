import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';
import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();

  const handleYoutubePress = () => {
    Linking.openURL('https://www.youtube.com/@dreamuclive');
  };

  const handleTelegramPress = () => {
    Linking.openURL('https://t.me/dreamuc_official');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/dreamuc_');
  };

  return (
    <View style={{marginTop: 10}}>
      {/* <View style={{ height: 150 }}></View> */}
      <Text style={{marginLeft: 15, color: '#444', fontFamily: 'MavenPro-SemiBold', fontSize: 12 ,}}>FOLLOW US ON -</Text>
      <View style={{paddingHorizontal: 4, paddingVertical: 15, flexDirection: 'row', flexWrap: 'wrap', columnGap: 7, rowGap: 7, justifyContent: 'center'}}>
      <TouchableOpacity onPress={handleInstagramPress} style={{backgroundColor: '#f7f7f8', flexDirection: 'row', paddingVertical: 7, 
        paddingHorizontal: 10,  borderRadius: 3, alignItems: 'center', width: '30%', justifyContent: 'center', borderWidth: 0.5, borderColor: '#e0e0e0'}}>
        <Image source={require('../assets/instagra.png')} style={{height: 16, width: 16, resizeMode: 'contain', marginRight: 4}} />
        <Text style={{fontFamily: 'MavenPro-Medium', fontSize: 13, color: '#757575'}}>Instagram</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleTelegramPress} style={{backgroundColor: '#f7f7f8', flexDirection: 'row',  paddingVertical: 7, 
        paddingHorizontal: 10,  borderRadius: 3, alignItems: 'center', width: '30%', justifyContent: 'center', borderWidth: 0.5, borderColor: '#e0e0e0'}}>
        <Image source={require('../assets/telegram.png')} style={{height: 16, width: 16, resizeMode: 'contain', marginRight: 4}} />
        <Text style={{fontFamily: 'MavenPro-Medium', fontSize: 13, color: '#757575'}}>Telegram</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleYoutubePress} style={{backgroundColor: '#f7f7f8', flexDirection: 'row',  paddingVertical: 7, 
        paddingHorizontal: 10,  borderRadius: 3, alignItems: 'center', width: '30%', justifyContent: 'center', borderWidth: 0.5, borderColor: '#e0e0e0'}}>
        <Image source={require('../assets/youtub.png')} style={{height: 16, width: 16, resizeMode: 'contain', marginRight: 4}} />
        <Text style={{fontFamily: 'MavenPro-Medium', fontSize: 13, color: '#757575'}}>Youtube</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={{backgroundColor: '#f1f1f1', flexDirection: 'row',  paddingVertical: 7, paddingHorizontal: 10,  borderRadius: 3, alignItems: 'center', width: '46%', justifyContent: 'center'}}>
        <Image source={require('../assets/loudspeaker.png')} style={{height: 16, width: 16, resizeMode: 'contain', marginRight: 4}} />
        <Text style={{fontFamily: 'MavenPro-Medium', fontSize: 13, color: '#757575'}}>Promotions</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={()=> navigation.navigate('Help')} style={{backgroundColor: '#f1f1f1', flexDirection: 'row',  paddingVertical: 7, paddingHorizontal: 10,  borderRadius: 3, alignItems: 'center', width: '46%', justifyContent: 'center'}}>
        <Image source={require('../assets/help1.png')} style={{height: 16, width: 16, resizeMode: 'contain', marginRight: 4}} />
        <Text style={{fontFamily: 'MavenPro-Medium', fontSize: 13, color: '#757575'}}>Help Center</Text>
      </TouchableOpacity> */}
      </View>

      <View style={{ height: 20 }}></View>

      {/* <View
        style={
          ({
            height: 115,
            backgroundColor: '#222',
            borderBottomWidth: 1,
            borderBottomColor: '#333',
          },
          styles.container)
        }>
        <TouchableOpacity
          style={styles.innerContainer}
          onPress={() => navigation.navigate('Login')}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/Logo.jpg')} // Add your image URL here
              style={styles.icon}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>DreamUC APP for Free</Text>
            <Text style={styles.text}>Download Now!</Text>
          </View>
        </TouchableOpacity>
      </View> */}

      {/* <View style={{ flexDirection: 'row', backgroundColor: '#222', width: '100%', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'flex-start', paddingVertical: 16, marginLeft: 15 }}>
          <Image source={require('../assets/Dreamuc1.png')} style={{ height: 50, width: 140, resizeMode: 'contain', borderRadius: 50 }} />
          <Text style={{ color: '#fff', fontFamily: 'MavenPro-SemiBold', fontSize: 11 }}>Copyright © 2024 Dreamuc.in All Rights Reserved.</Text>
          
        </View>
        <Image source={require('../assets/pubgpn.png')} style={{ height: 90, width: 50, resizeMode: 'cover' }} />
      </View> */}

      {/* <View
        style={{
          backgroundColor: '#424242',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#333',
        }}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.buttonText}>PRIVACY POLICY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Terms')}>
          <Text style={styles.buttonText}>TERMS & CONDITIONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CONTACT US</Text>
        </TouchableOpacity>
      </View> */}

      {/* <View
        style={{
          // height: 105,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 10,
        }}>
        <Text
          style={{
            color: '#fff',
            marginTop: 7,
            fontFamily: 'MavenPro-Medium',
            fontSize: 13,
          }}>
          © 2024 DreamUC Inc. All rights reserved.
        </Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'grey',
    paddingVertical: 20,
  },
  innerContainer: {
    backgroundColor: '#29B6F6',
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 13,
    marginBottom: 5,
    fontFamily: 'MavenPro-SemiBold',
  },
  button: {
    margin: 7,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'MavenPro-SemiBold',
    fontSize: 10,
    color: '#fff',
  },
});

export default Footer;
