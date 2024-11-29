import { View, Text, Image, Dimensions, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import { Bar } from 'react-native-progress'
import { API_KEY } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsContext from '../SettingsContext';


const api_url = `${API_KEY}`;

const Achievement = () => {
    const windowWidth = Dimensions.get('window').width;
    const width80Percent = Math.floor(windowWidth * 0.70);

    

    return (
        <View style={{ marginVertical: 20, paddingHorizontal: 15 }}>
            <Text style={{ color: '#444', fontFamily: 'MavenPro-SemiBold', fontSize: 12, }}>DAILY ACHIEVEMENT -</Text>
            <View style={{ marginTop: 10, justifyContent: 'space-between', width: '100%', rowGap: 7 }}>
                <View style={{ height: 80, borderWidth: 1.3, borderRadius: 5, borderColor: '#f1f1f1', flexDirection: 'row', padding: 10, alignItems: 'center', columnGap: 10, backgroundColor: '#fff' }}>
                    <Image source={require('../assets/dp_user.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#111' }}>Polls Campaign</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#888', fontSize: 13 }}>Complete all the polls</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#FFF2E7', paddingVertical: 4, paddingHorizontal: 7, borderRadius: 5, 
                            borderColor: '#fbc02d9e', borderWidth: 1, flexDirection: 'row' }} disabled>
                                <Text style={{ fontSize: 12.5, fontFamily: 'MavenPro-SemiBold', color: '#FFCC80' }}>Claim</Text>
                                <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 1.5, height: 15, width: 15, resizeMode: 'contain', marginLeft: 3 }} />
                                <Text style={{ fontSize: 12.5, fontFamily: 'MavenPro-SemiBold', color: '#FFCC80' }}>10</Text>
                            </TouchableOpacity>
                        </View>
                        <Bar
                            progress={0.47}
                            borderWidth={0}
                            style={{ marginTop: 7 }}
                            unfilledColor="#f1f1f1"
                            width={width80Percent}
                            color="#0b57cf"
                            animated={true}
                            height={7}
                        />
                    </View>
                </View>
                <View style={{ height: 80, borderWidth: 1.3, borderRadius: 5, borderColor: '#f1f1f1', flexDirection: 'row', padding: 10, alignItems: 'center', columnGap: 10, backgroundColor: '#fff' }}>
                    <Image source={require('../assets/dp_user.png')} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#111' }}>Check-in Collection</Text>
                                <Text style={{ fontFamily: 'MavenPro-Medium', color: '#888', fontSize: 13 }}>Complete all check-ins</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#FFF2E7', paddingVertical: 4, paddingHorizontal: 7, 
                                borderRadius: 5, borderColor: '#fbc02d9e', borderWidth: 1, flexDirection: 'row' }} disabled>
                                <Text style={{ fontSize: 12.5, fontFamily: 'MavenPro-SemiBold', color: '#FFCC80' }}>Claim</Text>
                                <Image source={require('../assets/DreamUC-DC.png')} style={{ marginTop: 1.5, height: 15, width: 15, resizeMode: 'contain', marginLeft: 3 }} />
                                <Text style={{ fontSize: 12.5, fontFamily: 'MavenPro-SemiBold', color: '#FFCC80' }}>10</Text>
                            </TouchableOpacity>
                        </View>
                        <Bar
                            progress={0.67}
                            borderWidth={0}
                            style={{ marginTop: 7 }}
                            unfilledColor="#f1f1f1"
                            width={width80Percent}
                            color="#0b57cf"
                            animated={true}
                            height={7}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Achievement