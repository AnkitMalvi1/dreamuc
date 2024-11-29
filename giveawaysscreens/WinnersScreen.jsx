// screens/WinnersScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";


const api_url = `${API_KEY}`;

const WinnersScreen = ({ route }) => {
  const { giveawayId } = route.params;
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(
        `${api_url}/giveaways/${giveawayId}/winners/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      const data = await response.json();
      setWinners(data);
    } catch (error) {
      console.error('Error fetching winners:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        winners.map(winner => (
          <View key={winner.id} style={styles.winner}>
            <Text>Username: {winner.user.bgmi_username}</Text>
            <Text>Comment: {winner.comment}</Text>
            <Text>Likes Count: {winner.likes_count}</Text>
            <Text>Prize Pool: {winner.prize} Rs</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  winner: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default WinnersScreen;
