import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import { API_KEY } from "@env";
import SettingsContext from '../SettingsContext';


const img_url = `${API_KEY}`;
const api_url = `${API_KEY}/rewards/`;

const CheckInScreen = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState(false);

  const { fetchRedeemCoins } = useContext(SettingsContext);


  useEffect(() => {
    fetchRewards();
  }, [claimed]);

  const rewardsClaim = async (reward_id) => {
    console.log(reward_id);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: reward_id,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        setClaimed(true);
        fetchRedeemCoins()
      }

      // console.log(data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  const fetchRewards = async () => {
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();

      setRewards(data.rewards);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching rewards:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <View>
        <Image
          source={require('../assets/streckbanner.jpg')}
          style={{ width: '100%', height: 245, resizeMode: 'stretch' }}
        />
      </View>
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.container}>
          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
              <Image source={require('../assets/loadgif.gif')} style={{ height: 400, width: 200, resizeMode: 'contain' }} />
            </View>
          ) : (
            rewards.map(reward => (
              <TouchableOpacity
                key={reward.id}
                style={styles.rewardContainer}
                onPress={() => console.log(reward.title)}>
                <Text style={styles.streaksText}>{reward.title}</Text>
                <Image
                  source={{ uri: `${img_url}${reward.image}` }}
                  style={styles.coinIcon}
                />
                <Text style={styles.coinText}>{reward.reward}</Text>
                {reward.reward_missed === 'Collect now' ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffe8c6',
                      paddingVertical: 7,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      marginTop: 10,
                    }}
                    onPress={() => rewardsClaim(reward.id)}>
                    <Text style={styles.claimText}>
                      {claimed ? 'Collected' : reward.reward_missed}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#ffe8c6',
                      paddingVertical: 7,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      marginTop: 10,
                    }}>
                    <Text style={styles.claimText}>
                      {reward.reward_missed}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardContainer: {
    width: '32%',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 10,
  },
  coinIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  streaksText: {
    fontFamily: 'MavenPro-Bold',
    color: '#222',
  },
  claimText: {
    fontFamily: 'MavenPro-Bold',
    color: 'orange',
    fontSize: 12,
  },
  coinText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'MavenPro-Medium',
  },
});

export default CheckInScreen;
