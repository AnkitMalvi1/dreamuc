import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import Winners from '../components/Winners'
import Icon from 'react-native-vector-icons/Ionicons';

const ChatScreen = () => {

  const handleSendMessage = () => {
    ToastAndroid.show('COMING SOON', ToastAndroid.SHORT)
  }
  return (
    <View style={{ height: '100%', backgroundColor: '#222' }}>
      <Navbar />
      <Winners />

      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 10 }}>
          <Image source={require('../assets/testuser.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />

          <View style={{ rowGap: 7 }}>
            <Text style={{ fontFamily: 'MavenPro-Medium', fontSize: 12, color: '#FFF' }}>DreamUC APP</Text>
            <Text style={{
              fontSize: 12, fontFamily: 'MavenPro-Medium', padding: 2, color: '#888', backgroundColor: '#494949bd',
              borderRadius: 1
            }}>
              World Chat coming soon with us!
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={{
        position: 'absolute', bottom: 0, backgroundColor: '#111', width: '100%',
        borderWidth: 1, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center',
        padding: 10, columnGap: 10
      }}>
        <Image source={require('../assets/testuser.png')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
        <View style={{
          borderWidth: 1, width: '84%', borderColor: '#666', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center', paddingRight: 10
        }}>
          <TextInput style={{ width: '85%', color: '#fff' }} placeholder='Enter Message...'
            placeholderTextColor={'#555'} />
          <TouchableOpacity onPress={handleSendMessage}>
            <Icon name="paper-plane-outline" size={30} color={'#FFEE58'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ChatScreen