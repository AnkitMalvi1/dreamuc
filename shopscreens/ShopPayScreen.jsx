import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Navbar from '../components/Navbar'
import Icon from 'react-native-vector-icons/Ionicons';

const ShopPayScreen = () => {
    return (
        <View>
            <Navbar />
            <ScrollView style={{ padding: 15, height: '90%' }}>
                <View style={{ flexDirection: 'row', columnGap: 5, marginTop: 10 }}>
                    <Icon name="card-outline" size={20} color={'#555'} style={{ marginTop: 1 }} />
                    <Text style={{ color: '#333', fontSize: 16, fontFamily: 'MavenPro-SemiBold' }}>Select Payment Method</Text>
                </View>

                <View style={{ padding: 15, borderWidth: 1, borderColor: '#e0e0e0', marginTop: 20, rowGap: 6 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{ color: '#222', fontSize: 15, fontFamily: 'MavenPro-SemiBold' }}>Online Payment</Text>
                    <Text style={{ color: '#888', fontSize: 15, fontFamily: 'MavenPro-Regular' }}>Best Value</Text>
                    </View>
                    <Text style={{ color: '#888', fontSize: 15, fontFamily: 'MavenPro-Regular' }}>Paytm, GPay, PhonePe available</Text>
                </View>
                <View style={{ padding: 15, borderWidth: 1, borderColor: '#e0e0e0', marginTop: 20, rowGap: 6 }}>
                    <Text style={{ color: '#222', fontSize: 15, fontFamily: 'MavenPro-SemiBold' }}>Cash on Delivery</Text>
                    <Text style={{ color: '#888', fontSize: 15, fontFamily: 'MavenPro-Regular' }}>COD is not available for this product</Text>
                </View>
                <View style={{ padding: 15, borderWidth: 1, borderColor: '#e0e0e0', marginTop: 20, rowGap: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#222', fontSize: 15, fontFamily: 'MavenPro-SemiBold' }}>DreamUC Winnings</Text>
                    </View>
                    <Text style={{ color: '#888', fontSize: 15, fontFamily: 'MavenPro-Regular' }}>Pay using your DreamUC Winnings</Text>
                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', columnGap: 5 }}>
                    <Icon name="bag-check-outline" size={20} color={'#555'} style={{}} />
                    <Text style={{ color: '#333', fontSize: 16, fontFamily: 'MavenPro-SemiBold', }}>Price Details</Text>
                </View>
                <View style={{ padding: 15, borderWidth: 1, borderColor: '#e0e0e0', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Text style={{ color: '#222', fontSize: 14, fontFamily: 'MavenPro-SemiBold', }}>Total</Text>
                        <Text style={{ color: '#888', fontSize: 14, fontFamily: 'MavenPro-Regular' }}>Rs. 599</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: '#222', fontSize: 14, fontFamily: 'MavenPro-SemiBold', }}>Delivery Fee</Text>
                        <Text style={{ color: '#888', fontSize: 14, fontFamily: 'MavenPro-Regular' }}>Rs. 25</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: '#222', fontSize: 14, fontFamily: 'MavenPro-SemiBold', }}>Discount</Text>
                        <Text style={{ color: '#888', fontSize: 14, fontFamily: 'MavenPro-Regular' }}>Rs. 0</Text>
                    </View>
                    <View style={{ marginTop: 10, borderTopWidth: 1, borderTopColor: '#e0e0e0', paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Text style={{ color: '#222', fontSize: 14, fontFamily: 'MavenPro-SemiBold', }}>Grand Total</Text>
                            <Text style={{ color: '#888', fontSize: 14, fontFamily: 'MavenPro-Regular' }}>Rs. 624</Text>
                        </View>
                        <Text style={{ color: '#888', fontSize: 14, fontFamily: 'MavenPro-SemiBold' }}>Inclusive of all taxes</Text>
                    </View>

                </View>

            </ScrollView>

            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, paddingHorizontal: 15 }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 15, backgroundColor: 'green' }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'MavenPro-SemiBold', marginRight: 8 }}>PLACE ORDER</Text>
                    <Icon name="arrow-forward-outline" size={21} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShopPayScreen