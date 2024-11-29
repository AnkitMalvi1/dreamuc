// screens/GiveawaysScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";


const api_url = `${API_KEY}`;

const GiveawaysScreen = ({ navigation }) => {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    fetchGiveaways();
  }, []);

  const fetchGiveaways = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(
        `${api_url}/giveaways/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      const data = await response.json();
      setGiveaways(data);
    } catch (error) {
      console.error('Error fetching giveaways:', error);
    }
    setLoading(false);
  };

  const handleJoin = async (giveawayId, entryFee) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(
        `${api_url}/giveaways/join/${giveawayId}/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );
      if (response.status === 200) {
        ToastAndroid.show('Joined successfully', ToastAndroid.SHORT);
        setJoined(true);
        fetchGiveaways();
      } else {
        ToastAndroid.show('Failed to join', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error joining giveaway:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        giveaways.map(giveaway => (
          <View key={giveaway.id} style={styles.giveaway}>
            <Text>Banner: {giveaway.banner}</Text>
            <Text>Total Participants: {giveaway.total_participants}</Text>
            <Text>Prize Pool: {giveaway.prize_pool} Rs</Text>
            <Text>Total Entry Fees: {giveaway.total_entry_fees} DC</Text>
            <Text>Expiry Date: {new Date(giveaway.expiry_date).toLocaleString()}</Text>
            <Text>Rules: {giveaway.rules}</Text>
            <Button
              title={joined ? 'Joined' : 'Join Now'}
              onPress={() => handleJoin(giveaway.id, giveaway.total_entry_fees)}
              disabled={joined}
            />
            <Button
              title="Winners Screen"
              onPress={() => navigation.navigate('Winners', { giveawayId: giveaway.id })}
              disabled={!joined}
            />
            <Button
              title="Comments Screen"
              onPress={() => navigation.navigate('Comments', { giveawayId: giveaway.id })}
              disabled={!joined}
            />
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
  giveaway: {
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default GiveawaysScreen;
