import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ShopItemScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Navbar />
            <ScrollView style={{ maxHeight: '81%' }}>
                <Image source={require('../assets/shop3.png')} style={{ height: 500, width: '100%', resizeMode: 'cover' }} />
                <View style={{ padding: 15 }}>
                    <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222' }}>DreamUC T-Shirt</Text>
                    <Text style={{ fontFamily: 'MavenPro-Medium', color: '#777', fontSize: 13.5, marginTop: 5 }}>Official Battlegrounds Mobile India Customised T-Shirt by DreamUC</Text>
                    <Text style={{ fontFamily: 'MavenPro-Medium', color: '#f1f1f1', fontSize: 13.5, marginTop: 10, textDecorationLine: 'line-through', width: 100, paddingVertical: 2, textAlign: 'center', backgroundColor: '#333', borderRadius: 3 }}>MRP: ₹599</Text>
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 5, height: 24, width: 24, resizeMode: 'contain' }} />
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#222', fontSize: 24, marginLeft: 2 }}>8000 DC</Text>
                    </View>
                    <Text style={{ fontFamily: 'MavenPro-Medium', color: '#777', fontSize: 13.5, marginTop: 5, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}>Inclusive of all taxes</Text>
                    <View style={{ paddingTop: 20 }}>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#000', fontSize: 20 }}>Product Details</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, justifyContent: 'space-between', columnGap: 7, rowGap: 10 }}>
                            <View style={{ width: '47%' }}>
                                <Text style={{ fontFamily: 'MavenPro-Medium' }}>Fit</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>Regular Fit</Text>
                            </View>
                            <View style={{ width: '47%' }}>
                                <Text style={{ fontFamily: 'MavenPro-Medium' }}>Fit</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>Regular Fit</Text>
                            </View>
                            <View style={{ width: '47%' }}>
                                <Text style={{ fontFamily: 'MavenPro-Medium' }}>Fit</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>Regular Fit</Text>
                            </View>
                            <View style={{ width: '47%' }}>
                                <Text style={{ fontFamily: 'MavenPro-Medium' }}>Fit</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>Regular Fit</Text>
                            </View>
                            <View style={{ width: '47%' }}>
                                <Text style={{ fontFamily: 'MavenPro-Medium' }}>Fit</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>Regular Fit</Text>
                            </View>
                            <View style={{ width: '47%' }}>
                                <Text style={{ fontFamily: 'MavenPro-Medium' }}>Fit</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#222', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>Regular Fit</Text>
                            </View>



                        </View>
                    </View>

                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#000', fontSize: 20, borderTopWidth: 1, borderTopColor: '#e0e0e0', paddingTop: 20, }}>Product Description</Text>
                        <Text style={{ fontFamily: 'MavenPro-Regular', color: '#222', fontSize: 14, paddingTop: 10, textAlign: 'justify' }}>DreamUC T-Shirt is a customised T-Shirt designed by DreamUC for the Battlegrounds Mobile India team. The shirt features a unique and intricate design inspired by the Battlegrounds logo, and includes a DreamUC logo on the front and back of the shirt. The sh
                            is made from 100% cotton and features a 5% polyester lining. The shirt is available in various sizes and colors. DreamUC T-Shirt is a customised T-Shirt designed by DreamUC for the Battlegrounds Mobile India team. The shirt features a unique and intricate design inspired by the Battlegrounds logo, and includes a DreamUC logo on the front and back of the shirt. The sh
                            is made from 100% cotton and features a 5% polyester lining. The shirt is available in various sizes and colors.
                        </Text>
                    </View>

                    <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#000', fontSize: 20, }}>Delivery Details</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}>
                            <Icon name="bag-check-outline" size={18} color={'#555'} style={{}} />
                            <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', marginLeft: 10 }}>Usually delivered within 6-7 days</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}>
                            <Icon name="cash-outline" size={18} color={'#555'} style={{}} />
                            <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', marginLeft: 10 }}>Cash-on-delivery not available</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}>
                            <Icon name="repeat-outline" size={18} color={'#555'} style={{}} />
                            <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', marginLeft: 10 }}>Return/ Exchange not available for this item</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ paddingVertical: 10, paddingHorizontal: 15, borderTopWidth: 1.5, borderTopColor: '#E0E0E0', flexDirection: 'row', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#333', fontSize: 16 }}>Balance: </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingRight: 15 }}>
                    <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 2, height: 18, width: 18, marginRight: 3, resizeMode: 'contain' }} />
                    <Text style={{ fontFamily: 'MavenPro-Regular', color: '#666', fontSize: 15 }}>890</Text>
                </View>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'green', paddingVertical: 12, borderRadius: 3 }} onPress={() => navigation.navigate('ShopDetails')}>
                    <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 16 }}>GET IT FOR: </Text>
                    <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 2, height: 19, width: 19, resizeMode: 'contain' }} />
                    <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff', fontSize: 16, marginLeft: 3 }}>8000 DC</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShopItemScreen