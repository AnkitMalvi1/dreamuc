import { View, Text, ActivityIndicator, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { API_KEY } from "@env";


const api_url = `${API_KEY}/`;

const NotifyScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}alert/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();
      setAlerts(data);
      // console.log(data)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <RenderHtml contentWidth={width} source={{ html: item.content }} />
  );

  // console.log(alerts);


  const { width } = useWindowDimensions();

  return (
    <View>
      <Navbar />
      <View style={{ padding: 15, backgroundColor: '#fff', height: '100%' }}>
        {loading ? (
          <View style={{ height: '92%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            {/* <Navbar /> */}
            <Image source={require('../assets/loadgif.gif')} style={{ height: 400, width: 200, resizeMode: 'contain' }} />
          </View>
        ) : (
          <FlatList
            data={alerts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </View>
  );
};

export default NotifyScreen;
