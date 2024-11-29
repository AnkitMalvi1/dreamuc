import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ShadowedView } from 'react-native-fast-shadow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY} from "@env";


const api_url = `${API_KEY}`;

const HighestDC = () => {
  const [ranks, setRanks] = useState([])
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHighDC();
  }, []);

  const fetchHighDC = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(
        `${api_url}/payments/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        },
      );
      const data = await response.json();
      setRanks(data.reverse());
    } catch (error) {
      console.error('Error fetching details:', error);
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 15,
      }}>
      {
        ranks.map((rank, index) => (
          <View style={{ marginBottom: 10 }} key={index}>
            <ShadowedView
              key={index}
              style={{
                shadowOpacity: 0.1,
                shadowRadius: 6,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
              }}>
              <View
                style={{
                  height: 60,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={{uri: `${api_url}${rank.user_profile}`}}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'cover',
                      borderRadius: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                  />
                  <View>
                    <Text style={{fontFamily: 'MavenPro-Medium', color: '#222'}}>{rank.bgmi_username}</Text>
                    <Text style={{fontFamily: 'MavenPro-Regular', color: '#222'}}>{rank.bgmi_id}</Text>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#F5F5F5',
                    padding: 5,
                    borderRadius: 5,
                    flexDirection: 'row'
                  }}>
                  <Image source={{uri: `${api_url}${rank.payment.redeem.image}`}} style={{ height: 19, width: 19, resizeMode: 'cover', marginRight: 4 }} />
                  <Text style={{fontFamily: 'MavenPro-Medium', color: '#222', fontSize: 13}}>{rank.payment.redeem.name}</Text>
                </View>
              </View>
            </ShadowedView>
          </View>
        ))
      }
    </View>
  );
};

export default HighestDC;
