import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ShopScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ backgroundColor: '#fff', height: '100%' }}>
            <Navbar />
            <ScrollView style={{ paddingVertical: 15, }}>
                <View style={{ paddingBottom: 10, borderBottomWidth: 1.5, borderBottomColor: '#E0E0E0', paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222', fontSize: 16 }}>DreamUC Shop</Text>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#888', fontSize: 13 }}>2 Items</Text>
                    </View>
                    <View style={{flexDirection: 'row', columnGap: 3, backgroundColor: '#333', padding: 5, borderRadius: 30}}>
                        <Icon name="cart-outline" size={20} color={'#fff'} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 17, padding: 7, justifyContent: 'space-around', paddingBottom: 30 }}>
                    <View style={{ width: '48%', rowGap: 3 }}>
                        <Image source={require('../assets/Tshirt5.jpg')} style={{ height: 250, width: '100%', resizeMode: 'cover', borderWidth: 1, borderColor: '#E0E0E0' }} />
                        <View style={{ position: 'absolute', top: 220, right: 10, flexDirection: 'row', backgroundColor: 'green', paddingHorizontal: 4, paddingVertical: 2, alignItems: 'center', borderRadius: 2 }}>
                            <Icon name="star" size={13} color={'#fff'} style={{ marginRight: 2 }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 13 }}>4.2</Text>
                        </View>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222', marginTop: 4 }}>Coming Soon</Text>
                        <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 15 }}>Battlegrounds India Customised T-Shirt</Text>
                        <Text style={{ fontFamily: 'MavenPro-Medium', textDecorationLine: 'line-through', fontSize: 12.5, color: '#888' }}>MRP: ₹599</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 3 }}>
                            <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 2, height: 18, width: 18, resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444' }}>XXXXX DC</Text>
                        </View>
                    </View>
                    {/* <View style={{ width: '48%', rowGap: 3 }}>
                        <Image source={require('../assets/shop2.jpg')} style={{ height: 250, width: '100%', resizeMode: 'cover', borderWidth: 1, borderColor: '#E0E0E0' }} />
                        <View style={{ position: 'absolute', top: 220, right: 10, flexDirection: 'row', backgroundColor: 'green', paddingHorizontal: 4, paddingVertical: 2, alignItems: 'center', borderRadius: 2 }}>
                            <Icon name="star" size={13} color={'#fff'} style={{ marginRight: 2 }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 13 }}>4.2</Text>
                        </View>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222', marginTop: 4 }}>Coming Soon</Text>
                        <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 15 }}>Battlegrounds India Customised T-Shirt</Text>
                        <Text style={{ fontFamily: 'MavenPro-Medium', textDecorationLine: 'line-through', fontSize: 12.5, color: '#888' }}>MRP: ₹599</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 3 }}>
                            <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 2, height: 18, width: 18, resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444' }}>XXXXX DC</Text>
                        </View>
                    </View>
                    <View style={{ width: '48%', rowGap: 3 }}>
                        <Image source={require('../assets/shop1.jpg')} style={{ height: 250, width: '100%', resizeMode: 'cover', borderWidth: 1, borderColor: '#E0E0E0' }} />
                        <View style={{ position: 'absolute', top: 220, right: 10, flexDirection: 'row', backgroundColor: 'green', paddingHorizontal: 4, paddingVertical: 2, alignItems: 'center', borderRadius: 2 }}>
                            <Icon name="star" size={13} color={'#fff'} style={{ marginRight: 2 }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 13 }}>4.2</Text>
                        </View>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222', marginTop: 4 }}>Coming Soon</Text>
                        <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 15 }}>Battlegrounds India Customised T-Shirt</Text>
                        <Text style={{ fontFamily: 'MavenPro-Medium', textDecorationLine: 'line-through', fontSize: 12.5, color: '#888' }}>MRP: ₹599</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 3 }}>
                            <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 2, height: 18, width: 18, resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444' }}>XXXXX DC</Text>
                        </View>
                    </View> */}
                    <View style={{ width: '48%', rowGap: 3 }}>
                        <Image source={require('../assets/Tshirt6.jpg')} style={{ height: 250, width: '100%', resizeMode: 'cover', borderWidth: 1, borderColor: '#E0E0E0' }} />
                        <View style={{ position: 'absolute', top: 220, right: 10, flexDirection: 'row', backgroundColor: 'green', paddingHorizontal: 4, paddingVertical: 2, alignItems: 'center', borderRadius: 2 }}>
                            <Icon name="star" size={13} color={'#fff'} style={{ marginRight: 2 }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 13 }}>4.2</Text>
                        </View>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222', marginTop: 4 }}>Coming Soon</Text>
                        <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 15 }}>Battlegrounds India Customised T-Shirt</Text>
                        <Text style={{ fontFamily: 'MavenPro-Medium', textDecorationLine: 'line-through', fontSize: 12.5, color: '#888' }}>MRP: ₹599</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 3 }}>
                            <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 2, height: 18, width: 18, resizeMode: 'contain' }} />
                            <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444' }}>XXXXX DC</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default ShopScreen