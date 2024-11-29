import { View, Text, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { API_KEY } from "@env";
import { useRoute } from '@react-navigation/native';


const api_url = `${API_KEY}/`;

const ResetPassScreen = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const route = useRoute();
    // const { uuid } = route.params;

    const handleResetPassword = async () => {
        if (!password) {
            Alert.alert('Error', 'Please enter the password.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${api_url}reset-password/${uuid}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', data.success || 'Password reset successfully.');
            } else {
                Alert.alert('Error', data.error || 'Something went wrong.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to reset password. Please try again later.');
        }
        setLoading(false);
    };

    return (
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: 'black',
                    paddingVertical: 17,
                    paddingHorizontal: 14,
                }}>
                <Image
                    source={require('../assets/DreamUC.png')}
                    style={{ width: 130, height: 25, resizeMode: 'contain' }}
                />
            </View>

            <View
                style={{ backgroundColor: '#fff', alignItems: 'center' }}>
                <Image
                    source={require('../assets/login_logo.jpg')}
                    style={{ width: 200, height: 200, resizeMode: 'contain' }}
                />

                <Text
                    style={{ fontSize: 20, fontFamily: 'MavenPro-Bold', color: '#333' }}>
                    Reset Password
                </Text>
                <Text
                    style={{
                        marginTop: 10,
                        fontSize: 16,
                        fontFamily: 'MavenPro-Medium',
                        color: '#333',
                    }}>
                    Welcome Back!
                </Text>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={'#9E9E9E'}
                    style={{
                        marginTop: 30,
                        borderBottomWidth: 2,
                        borderBottomColor: '#eee',
                        width: '80%',
                        padding: 0,
                        fontFamily: 'MavenPro-Regular',
                        fontSize: 12.5,
                        color: '#424242'
                    }}
                    cursorColor={'orange'}
                    value={password}
                    onChangeText={text => setPassword(text.trim())}
                />

                <View style={{ marginTop: 20, rowGap: 10 }}>
                    <Button
                        title={'RESET'}
                        color={'#ffa500'}
                        titleStyle={{
                            width: '80%',
                            fontFamily: 'MavenPro-Medium',
                            fontSize: 12,
                        }}
                        onPress={handleResetPassword}
                        disabled={loading}
                    />
                </View>
            </View>

        </View>
    )
}

export default ResetPassScreen;