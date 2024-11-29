import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated, Dimensions, TouchableOpacity, TextInput, ToastAndroid, Linking } from 'react-native';
import { Bar } from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";
import Icon from 'react-native-vector-icons/Ionicons';


const api_url = `${API_KEY}/`;

const Mining = () => {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const [btnEnabled, setBtnEnabled] = useState(false);
    const [claimedCouponsCount, setClaimedCouponsCount] = useState(0);
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');

    const fetchData = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('access_token');
        try {
            const response = await fetch(
                `${api_url}cipher/`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                },
            );
            const data = await response.json();
            setBalance(data.dtc_coin);
            setBtnEnabled(data.btn_enabled);
            setClaimedCouponsCount(data.claimed_coupons_count);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
        setLoading(false);
    };

    const postCipher = async (code) => {
        const token = await AsyncStorage.getItem('access_token');
        try {
            const response = await fetch(
                `${api_url}cipher/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                    body: JSON.stringify({ coupon_code: code }),
                },
            );
            const data = await response.json();
            if (response.status === 200) {
                ToastAndroid.show('Coupon claimed successfully', ToastAndroid.LONG);
                fetchData(); 
            } else {
                ToastAndroid.show(`${data.detail}`, ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error claiming coupon:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const windowWidth = Dimensions.get('window').width;
    const width80Percent = Math.floor(windowWidth * 0.58);

    const handleTelegramPress = () => {
        Linking.openURL('https://t.me/dreamuc_official');
    };


    return (

        <View style={{ paddingHorizontal: 20, rowGap: 10, marginTop: 10, width: '100%' }}>

            {loading ?
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '92%' }}>
                    <Image source={require('../assets/esports_logo.png')} style={{ height: 180, width: 180, resizeMode: 'cover' }} />
                </View>
                :
                <View
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderRadius: 1,
                        rowGap: 5,
                    }}>
                    <Image source={require('../assets/esports_logo.png')} style={{ height: 240, width: 300, resizeMode: 'contain', backgroundColor: '#fff' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <View style={{ width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2, justifyContent: 'center' }}>
                                <Icon name="rocket-outline" size={14} color={'#555'} style={{ alignItems: 'center', justifyContent: 'center', marginRight: 4, }} />
                                <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444', fontSize: 13, }}>DAILY DTC MINING</Text>
                            </View>



                        </View>
                    </View>

                    <View style={{ backgroundColor: '#fff1dc', paddingVertical: 15, alignItems: 'center', width: '100%', rowGap: 5, marginTop: 10 }}>
                        <View>
                            <Text style={{ color: '#333', fontSize: 12, fontFamily: 'MavenPro-SemiBold', textAlign: 'center' }}>
                                BALANCE
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 4 }}>
                            <Text style={{ color: '#555', fontSize: 26, fontFamily: 'MavenPro-SemiBold', textAlign: 'center', marginBottom: 2 }}>
                                {balance} DTC
                            </Text>
                            {/* <Image source={require('../assets/DC.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} /> */}
                        </View>

                        <View style={{ rowGap: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginBottom: 2, marginTop: 5 }}>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#555', fontSize: 15.5 }}>Collect Upto 5.6k Points Daily!</Text>
                            </View>

                            <Bar
                                progress={0.3}
                                borderWidth={0}
                                unfilledColor="#f7f7f8"
                                width={width80Percent}
                                color="orange"
                                animated={true}
                                indeterminate={claimedCouponsCount === 1 ? true : false}
                                height={6}
                            />

                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 20, marginTop: 5 }}>
                                    {/* <Icon name="hourglass-outline" size={14} color={'#555'} /> */}
                                    <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444', marginLeft: 3, fontSize: 13 }}>Get codes on -</Text>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 20, marginTop: 5 }} onPress={handleTelegramPress}>
                                    <Image source={require('../assets/telegram.png')} style={{ height: 14, width: 14, resizeMode: 'contain' }} />
                                    <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#444', marginLeft: 3, fontSize: 12 }}>Telegram</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', columnGap: 20, marginTop: 10 }}>
                                <View style={{ width: '40%', rowGap: 10 }}>
                                    <TextInput
                                        style={{ padding: 0, backgroundColor: '#fff', textAlign: 'center', paddingVertical: 4, color: '#444',}}
                                        placeholder='CODE 1'
                                        placeholderTextColor={'#e0e0e0'}
                                        value={code1}
                                        onChangeText={setCode1}
                                    />
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'green', paddingVertical: 8, alignItems: 'center', borderRadius: 2 }}
                                        onPress={() => postCipher(code1)}
                                        disabled={claimedCouponsCount >= 1}
                                    >
                                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff' }}>START</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '40%', rowGap: 10 }}>
                                <TextInput
                                        style={{ padding: 0, backgroundColor: '#fff', textAlign: 'center', paddingVertical: 4, color: '#444' }}
                                        placeholder='CODE 2'
                                        placeholderTextColor={'#e0e0e0'}
                                        value={code2}
                                        onChangeText={setCode2}
                                    />
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'green', paddingVertical: 8, alignItems: 'center', borderRadius: 2 }}
                                        onPress={() => postCipher(code2)}
                                        disabled={claimedCouponsCount >= 2}
                                    >
                                        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#fff' }}>END</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>

                    </View>




                </View>
            }
        </View>

    );
};

export default Mining;
