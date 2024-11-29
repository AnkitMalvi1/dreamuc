import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";

const api_url = `${API_KEY}`;

const HistoryScreen = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('access_token');
        try {
            const response = await fetch(
                `${api_url}/history/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(token)}`,
                    },
                },
            );
            const data = await response.json();
            setHistory(data.rewards_history);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
        setLoading(false);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={'#000'} />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ScrollView style={styles.scrollView}>
                {history.map((item) => (
                    <View key={item.id} style={styles.historyItem}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.rewardText}>{item.reward_type.toUpperCase()}</Text>
                            <Text style={[styles.coinText, { color: item.coin_type ? '#20c997' : 'red' }]}>{item.coin_type ? `+${item.reward_coin}` : `-${item.reward_coin}`}</Text>
                        </View>
                        <Text style={styles.timeText}>{formatDate(item.time)}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#fff',
    },
    historyItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
    timeText: {
        fontSize: 13,
        color: '#666',
        fontFamily: 'MavenPro-Regular',
    },
    rewardText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'MavenPro-SemiBold',
    },
    coinText: {
        fontSize: 16,
        fontFamily: 'MavenPro-SemiBold',
    },
});

export default HistoryScreen;
