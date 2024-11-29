import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Linking,
  StatusBar
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import { useAuth } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, error, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    await login({ email, password })
    navigation.replace('Home');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://sites.google.com/view/dreamuc-privacy-policy/home');
  };

  const handleTermsConditions = () => {
    Linking.openURL('https://sites.google.com/view/dreamuc-terms-and-conditions/home');
  };

  return (
    <ScrollView style={{ height: '100%', backgroundColor: '#fff' }}>
      <StatusBar animated={true} backgroundColor="#000" />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'black',
          paddingVertical: 17,
          paddingHorizontal: 14,
        }}>
        <Image
          source={require('../assets/DreamUC.png')}
          style={{ width: 130, height: 25, resizeMode: 'contain' }}
        />
      </View>
      <View
        style={{ backgroundColor: '#fff', alignItems: 'center' }}>
        <Image
          source={require('../assets/login_logo.jpg')}
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
        />

        <Text
          style={{ fontSize: 20, fontFamily: 'MavenPro-Bold', color: '#333' }}>
          Login
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            fontFamily: 'MavenPro-Medium',
            color: '#333',
          }}>
          Welcome Back!
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor={'#9E9E9E'}
          style={{
            marginTop: 30,
            borderBottomWidth: 2,
            borderBottomColor: '#eee',
            width: '80%',
            padding: 0,
            fontFamily: 'MavenPro-Regular',
            fontSize: 12.5,
            color: '#424242'
          }}
          cursorColor={'orange'}
          value={email}
          onChangeText={text => setEmail(text.trim())}
          inputMode='email'
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
            color: '#424242'
          }}
          cursorColor={'orange'}
          value={password}
          onChangeText={text => setPassword(text.trim())}
          secureTextEntry
        />
        {/* <TouchableOpacity
          style={{ marginVertical: 15, alignItems: 'flex-start', width: '80%' }}
          onPress={() => navigation.navigate('ForgotPass')}>
          <Text
            style={{
              color: '#1e90ff',
              fontFamily: 'MavenPro-Regular',
              fontSize: 12.5,
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity> */}
        <View style={{ marginTop: 20, rowGap: 10 }}>
          <Button
            title={'CONTINUE'}
            color={'#ffa500'}
            titleStyle={{
              width: '80%',
              fontFamily: 'MavenPro-Medium',
              fontSize: 12,
            }}
            onPress={handleLogin}
          />
          <Text style={{ textAlign: 'center', fontFamily: 'MavenPro-Bold' }}>
            OR
          </Text>
          <Button
            title={'CREATE NEW ACCOUNT'}
            color={'#272b41b3'}
            titleStyle={{
              width: '80%',
              fontFamily: 'MavenPro-Medium',
              fontSize: 12,
            }}
            onPress={() => navigation.navigate('Signup')}
          />
        </View>

        <View style={{ marginTop: 20, flexDirection: 'row', width: '70%', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={handlePrivacyPolicy}>
            <Text style={{fontFamily: 'MavenPro-SemiBold', color: '#888'}}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTermsConditions}>
            <Text style={{fontFamily: 'MavenPro-SemiBold', color: '#888'}}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>



    </ScrollView>
  );
};

export default LoginScreen;
