import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { API_KEY } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';


const api_url = `${API_KEY}`;

const AcTransferScreen = () => {
    const [bgmiId, setBgmiId] = useState('');
    const [bgmiUsername, setBgmiUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        setIsButtonDisabled(!(bgmiId.length > 0 && bgmiUsername.length > 0 && email.length > 0));
    }, [bgmiId, bgmiUsername, email]);

    const handleBackupRequest = async () => {
        try {
            const requestData = {
                bgmi_id: bgmiId,
                bgmi_username: bgmiUsername,
                email: email
            };
    
            const access_token = await AsyncStorage.getItem('access_token');
    
            const response = await fetch(`${api_url}/backup/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(access_token)}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Reset input fields after successful submission
            if (bgmiId.length > 0 && bgmiUsername.length > 0 && email.length > 0) {
                setBgmiId('');
                setBgmiUsername('');
                setEmail('');
                setIsButtonDisabled(true);
                ToastAndroid.show('Backup request sent successfully', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
            }
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            ToastAndroid.show('Error', 'Failed to submit backup request. Please try again later.', ToastAndroid.SHORT);
        }
    };
    

    return (
        <View style={{ backgroundColor: '#fff', height: '100%', padding: 15 }}>
            <Text style={{ color: '#000', fontFamily: 'MavenPro-SemiBold', marginBottom: 10 }}>Fill your old Account Details to get back it:</Text>
            <Text style={{ color: '#757575', fontFamily: 'MavenPro-SemiBold' }}>βGMI ID:</Text>
            <TextInput
                keyboardType='numeric'
                underlineColorAndroid={'orange'}
                maxLength={15}
                style={{ marginBottom: 10, color: '#555' }}
                value={bgmiId}
                onChangeText={text => setBgmiId(text)}
                placeholder='For eg. 51234567890'
                placeholderTextColor={'#BDBDBD'}
            />
            <Text style={{ color: '#757575', fontFamily: 'MavenPro-SemiBold' }}>βGMI Username:</Text>
            <TextInput
                underlineColorAndroid={'orange'}
                maxLength={20}
                style={{ marginBottom: 10, color: '#555' }}
                value={bgmiUsername}
                onChangeText={text => setBgmiUsername(text)}
                placeholder='For eg. Mr Dynamox'
                placeholderTextColor={'#BDBDBD'}
            />
            <Text style={{ color: '#757575', fontFamily: 'MavenPro-SemiBold' }}>Email ID:</Text>
            <TextInput
                keyboardType='email-address'
                underlineColorAndroid={'orange'}
                maxLength={35}
                style={{ marginBottom: 10, color: '#555' }}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder='For eg. xyz@gmail.com'
                placeholderTextColor={'#BDBDBD'}
            />

            <View style={{ marginTop: 15 }}>
                <Button
                    title={'Backup Request'}
                    color={'orange'}
                    onPress={handleBackupRequest}
                    disabled={isButtonDisabled}
                />
            </View>
        </View>
    );
};

export default AcTransferScreen;
