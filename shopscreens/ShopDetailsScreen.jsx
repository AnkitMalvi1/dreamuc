import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ShopDetailsScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Navbar />
      <ScrollView style={{ paddingVertical: 15, marginBottom: 30 }}>
        <View style={{ paddingHorizontal: 15, rowGap: 10 }}>
          <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#333', fontSize: 18, }}>Select Size</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TouchableOpacity style={{ width: 60, borderWidth: 1, borderColor: '#dedde2', padding: 7, borderRadius: 4 }}>
              <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#666', fontSize: 16, textAlign: 'center' }}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 60, borderWidth: 1, borderColor: '#dedde2', padding: 7, borderRadius: 4 }}>
              <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#666', fontSize: 16, textAlign: 'center' }}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 60, borderWidth: 1, borderColor: '#dedde2', padding: 7, borderRadius: 4 }}>
              <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#666', fontSize: 16, textAlign: 'center' }}>L</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 60, borderWidth: 1, borderColor: '#dedde2', padding: 7, borderRadius: 4 }}>
              <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#666', fontSize: 16, textAlign: 'center' }}>XL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 60, borderWidth: 1, borderColor: '#dedde2', padding: 7, borderRadius: 4 }}>
              <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#666', fontSize: 16, textAlign: 'center' }}>XXL</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 15, rowGap: 10, borderBottomWidth: 1, paddingBottom: 20, borderBottomColor: '#e0e0e0' }}>
          <Text style={{ fontFamily: 'MavenPro-SemiBold', fontSize: 17, color: '#333' }}>Personalise</Text>
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="Enter Name" />
        </View>
        <View style={{ padding: 15, rowGap: 10 }}>
          <Text style={{ fontFamily: 'MavenPro-SemiBold', fontSize: 17, color: '#333' }}>Contact Details</Text>
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="Full Name*" />
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="Mobile Number*" />
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="Email Address*" />
        </View>
        <View style={{ padding: 15, rowGap: 10 }}>
          <Text style={{ fontFamily: 'MavenPro-SemiBold', fontSize: 17, color: '#333' }}>Add Address</Text>
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="Pincode*" />
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="Locality/Town*" />
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="Address*" />
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="City*" />
          <TextInput style={{
            fontFamily: 'MavenPro-Medium', fontSize: 15, color: '#555', paddingHorizontal: 10, paddingVertical: 7, borderWidth: 1,
            borderColor: '#dedde2', borderRadius: 4
          }}
            placeholder="State*" />
        </View>

        <View style={{ paddingHorizontal: 15, height: 100 }}>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'green', paddingVertical: 12, borderRadius: 3 }} onPress={() => navigation.navigate('Payment')}>
            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 16 }}>GET IT FOR: </Text>
            <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 2, height: 19, width: 19, resizeMode: 'contain' }} />
            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 16, marginLeft: 3 }}>8000 DC</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </View>
  )
}

export default ShopDetailsScreen