import { View, Text, FlatList, TextInput, TouchableOpacity, Linking } from 'react-native'
import { Button } from '@rneui/themed';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {API_KEY} from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


const api_url = `${API_KEY}`;

const HelpCenterScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleMessageSend = async () => {
    try {
      if (title.length < 5 || title.length > 39) {
        ToastAndroid.show('Title should be 5-39 characters long', ToastAndroid.SHORT);
        return;
      }
  
      if (description.length < 10) {
        ToastAndroid.show('Message should be at least 10 characters', ToastAndroid.SHORT);
        return;
      }

      const access_token = await AsyncStorage.getItem('access_token');
      const response = await fetch(`${api_url}/help/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(access_token)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          msg_Title: title,
          msg_desc: description,
        }),
      });

      if (!response.ok) {
        throw new Error('Error sending message');
      }

      // Reset the input fields after successful submission
      setTitle('');
      setDescription('');
      ToastAndroid.show('Message sent successfully', ToastAndroid.SHORT);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL('https://sites.google.com/view/dreamuc-privacy-policy/home');
  };

  const handleTermsConditions = () => {
    Linking.openURL('https://sites.google.com/view/dreamuc-terms-and-conditions/home');
  };

  const handleAbout = () => {
    Linking.openURL('https://sites.google.com/view/dreamuc-about-us/home');
  };

  const titleData = [
    { id: 1, title: 'Privacy Policy' },
    { id: 2, title: 'Terms and Conditions' },
    { id: 3, title: 'Account Transfer' },
    { id: 4, title: 'About'}
  ];

  const handleTitlePress = (title) => {
    if (title === 'Privacy Policy') {
      handlePrivacyPolicy();
    } else if (title === 'Terms and Conditions') {
      handleTermsConditions();
    } else if (title === 'Account Transfer') {
      navigation.navigate('AcTransfer');
    } else if (title === 'About') {
      handleAbout();
    }
  };

  const renderTitleItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleTitlePress(item.title)}>
      <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
        <Text style={{ fontSize: 16, fontFamily: 'MavenPro-SemiBold', color: '#616161' }}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ backgroundColor: '#fff', height: '100%' }}>
      <View style={{ padding: 15 }}>
        {/* Title Boxes for Privacy Policy and Terms and Conditions */}
        <FlatList
          data={titleData}
          renderItem={renderTitleItem}
          keyExtractor={(item) => item.id.toString()}
        />

        {/* Message Input */}
        <View style={{marginTop: 20}}>
          <Text style={{ fontSize: 16, fontFamily: 'MavenPro-SemiBold', color: '#616161' }}>Contact Us -</Text>
          <TextInput
            style={{ color: '#616161', borderColor: 'lightgray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10, textAlign: 'justify', fontFamily: 'MavenPro-SemiBold', borderRadius: 5 }}
            placeholder="Title here..."
            placeholderTextColor="grey"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={{ color: '#616161', height: 150, borderColor: 'lightgray', borderWidth: 1, marginTop: 10, paddingHorizontal: 10, textAlign: 'justify', fontFamily: 'MavenPro-Regular', textAlignVertical: 'top', borderRadius: 5 }}
            placeholder="Type your message here..."
            placeholderTextColor="grey"
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Send Button */}
          <View style={{ marginTop: 20 }}>
            <Button
              title="Send"
              onPress={handleMessageSend}
              color={'orange'}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default HelpCenterScreen