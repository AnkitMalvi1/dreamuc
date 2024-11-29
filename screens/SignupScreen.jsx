import {View, Text, TouchableOpacity, TextInput, ToastAndroid, ScrollView, Linking} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from 'react-native';
import {Button} from '@rneui/themed';
import { Keyboard } from 'react-native';
import {API_KEY} from "@env";


const api_url = `${API_KEY}/`;

const SignupScreen = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch(`${api_url}signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: displayName,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        // console.log(response);
        // throw new Error('Network response was not ok');
        return ToastAndroid.show('Invalid email or password, Try again!', ToastAndroid.LONG);
      }

      const responseData = await response.json();
      // console.log(responseData); 
      navigation.navigate('Login'); // Redirect to login screen after successful signup
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://sites.google.com/view/dreamuc-privacy-policy/home');
  };

  const handleTermsConditions = () => {
    Linking.openURL('https://sites.google.com/view/dreamuc-terms-and-conditions/home');
  };

  return (
    <ScrollView style={{height: '100%', backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'black',
          paddingVertical: 17,
          paddingHorizontal: 14,
        }}>
        <Image
          source={require('../assets/DreamUC.png')}
          style={{width: 130, height: 25, resizeMode: 'contain'}}
        />
      </View>
      <View
        style={{backgroundColor: '#fff', height: '100%', alignItems: 'center'}}>
        <Image
          source={require('../assets/login_logo.jpg')}
          style={{width: 200, height: 200, resizeMode: 'contain'}}
        />

        <Text
          style={{fontSize: 20, fontFamily: 'MavenPro-Bold', color: '#333'}}>
          Signup
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            fontFamily: 'MavenPro-Medium',
            color: '#333',
          }}>
          Welcome to DreamUC!
        </Text>
        <TextInput
          placeholder="Name"
          placeholderTextColor={'#9E9E9E'}
          style={{
            marginTop: 30,
            borderBottomWidth: 2,
            borderBottomColor: '#eee',
            width: '80%',
            padding: 0,
            fontFamily: 'MavenPro-Regular',
            fontSize: 12.5,
            color: '#333',
          }}
          cursorColor={'orange'}
          value={displayName}
          onChangeText={setDisplayName}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor={'#9E9E9E'}
          style={{
            marginTop: 20,
            borderBottomWidth: 2,
            borderBottomColor: '#eee',
            width: '80%',
            padding: 0,
            fontFamily: 'MavenPro-Regular',
            fontSize: 12.5,
            color: '#333',
          }}
          cursorColor={'orange'}
          value={email}
          inputMode='email'
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={'#9E9E9E'}
          style={{
            marginTop: 20,
            borderBottomWidth: 2,
            borderBottomColor: '#eee',
            width: '80%',
            padding: 0,
            fontFamily: 'MavenPro-Regular',
            fontSize: 12.5,
            color: '#333',
          }}
          cursorColor={'orange'}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={{
            marginBottom: 15,
            marginTop: 5,
            alignItems: 'flex-start',
            width: '80%',
          }}>
          <Text
            style={{
              color: '#555',
              fontFamily: 'MavenPro-Regular',
              fontSize: 11,
            }}>
            Eg. Dream@123
          </Text>
        </TouchableOpacity>
        <View style={{rowGap: 10}}>
          <View>
            <Text style={{fontFamily: 'MavenPro-Medium', fontSize: 13, color: '#555', alignItems: 'center'}}>By creating an account, I agree to DreamUC's </Text>
            <View style={{flexDirection: 'row', columnGap: 3, alignItems: 'center'}}>
            <TouchableOpacity onPress={handlePrivacyPolicy}><Text style={{fontFamily: 'MavenPro-Medium', color: '#e54304', textDecorationLine: 'underline', fontSize: 13}}>Privacy Policy</Text></TouchableOpacity>
            <Text style={{fontFamily: 'MavenPro-Medium', fontSize: 13, color: '#333',}}>&</Text>
            <TouchableOpacity onPress={handleTermsConditions}><Text style={{fontFamily: 'MavenPro-Medium', color: '#e54304', textDecorationLine: 'underline', fontSize: 13}}>Terms & Conditions</Text></TouchableOpacity>
            </View>
            
          </View>
          <Button
            title={'CONTINUE'}
            color={'#ffa500'}
            titleStyle={{
              width: '80%',
              fontFamily: 'MavenPro-Medium',
              fontSize: 12,
            }}
            onPress={handleSignup}
          />
          <Text style={{textAlign: 'center', fontFamily: 'MavenPro-Bold'}}>
            OR
          </Text>
          <Button
            title={'LOGIN'}
            color={'#272b41b3'}
            titleStyle={{
              width: '80%',
              fontFamily: 'MavenPro-Medium',
              fontSize: 12,
            }}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
