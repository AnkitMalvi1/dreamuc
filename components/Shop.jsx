import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Shop = () => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 15, backgroundColor: '#fff', paddingBottom: 20, rowGap: 8, marginTop: 20}}>
            <View style={{  }}>
                <Text style={{ fontFamily: 'MavenPro-Bold', color: '#333', fontSize: 14, marginBottom: 4 }}>DreamUC Shop</Text>
                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#62728c', fontSize: 13 }}>Get Your Customized Name T-Shirt for Free!</Text>
                
            </View>
            <TouchableOpacity style={{  flexDirection: 'row', justifyContent: 'space-between' }} 
            onPress={()=> navigation.navigate('Shop')}
            >
                <View style={{ height: 120, width: '100%' }}>
                    <Image source={require('../assets/Banner.jpg')} style={{ height: '100%', width: '100%', borderRadius: 5 }} resizeMode='cover' />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Shop