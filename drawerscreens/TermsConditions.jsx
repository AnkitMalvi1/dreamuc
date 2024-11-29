import { View, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {API_KEY} from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';


const api_url = `${API_KEY}/`;

const TermsConditions = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    termsConditions();
  }, []);

  const termsConditions = async () => {
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();
      setTerms(data.terms);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setLoading(false);
    }
  };

  const renderItem = ({item}) => (
    <RenderHtml contentWidth={width} source={{html: item.content}} />
  );

  const {width} = useWindowDimensions();

  return (
    <View style={{padding: 15}}>
      {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            data={terms}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
    </View>
  )
}

export default TermsConditions