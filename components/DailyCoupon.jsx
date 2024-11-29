import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { API_KEY } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsContext from '../SettingsContext';

const api_url = `${API_KEY}`;

const DailyCoupon = () => {
    const [couponCode, setCouponCode] = useState('');
    const windowWidth = Dimensions.get('window').width;
    const width80Percent = Math.floor(windowWidth * 0.70);

    const { fetchRedeemCoins } = useContext(SettingsContext);



    const handleCouponCodeChange = (value) => {
        setCouponCode(value);
    };

    const postCoupon = async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!couponCode) {
            ToastAndroid.show('Please enter a coupon code.', ToastAndroid.SHORT);
            return;
        }
        try {
            const response = await fetch(
                `${api_url}/claim-coupon/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                    body: JSON.stringify({ coupon_code: couponCode }),
                },
            );
            const data = await response.json();
            if (response.status === 201) {
                ToastAndroid.show("Coupon claimed successfully!", ToastAndroid.LONG);
                setCouponCode('');
                fetchRedeemCoins();
            } else if (response.status === 404) {
                ToastAndroid.show("Coupon not found", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(`${data.detail}`, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    return (
        <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
            <Text style={{ color: '#444', fontFamily: 'MavenPro-SemiBold', fontSize: 12, }}>DAILY COUPONS -</Text>
            <View style={{ marginTop: 10, justifyContent: 'space-between', borderWidth: 1, borderRadius: 5, borderColor: '#C5E1A5' }}>
                
               
                    <View style={{ borderRadius: 5, borderColor: '#f1f1f1', padding: 10, backgroundColor: '#F1F8E9', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#FFF', paddingBottom: 10 }}>
                            <View style={{ rowGap: 10 }}>
                                <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444' }}>Fill Coupons to get daily rewards -</Text>
                                <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#777', fontSize: 10.5 }}>Win 2 Daily Coupons Codes upto 2000 DC!</Text>
                              
                                <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#777', fontSize: 10.5, }}>{`Get Coupon Code on - \nwww.dreamuc.com > Coupon Codes`}</Text>
                            </View>
                            <Image source={require('../assets/coupo.png')} style={{ height: 50, width: 50, resizeMode: 'cover', }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, justifyContent: 'space-between' }}>
                            <TextInput
                                style={{ backgroundColor: '#fff', paddingVertical: 0, borderRadius: 5, borderWidth: 0.6, borderColor: '#EEEEEE', paddingHorizontal: 10, fontSize: 12, fontFamily: 'MavenPro-Medium', color: 'red', width: '70%' }}
                                placeholder='Enter a coupon' placeholderTextColor={'#9E9E9E'}
                                value={couponCode}
                                onChangeText={handleCouponCodeChange}
                            />
                            <TouchableOpacity
                                style={{ backgroundColor: '#444', paddingVertical: 6, borderRadius: 5, paddingHorizontal: 20 }}
                                onPress={postCoupon}
                            >
                                <Text style={{ fontSize: 11.5, fontFamily: 'MavenPro-Medium', color: '#fff' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

            </View>
        </View>
    )
}

export default DailyCoupon;
