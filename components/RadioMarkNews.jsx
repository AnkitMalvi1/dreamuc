import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import MarqueeText from 'react-native-marquee';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_KEY } from "@env";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'


const api_url = `${API_KEY}`;

const RadioMarkNews = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const componentWidth = windowWidth * 0.86;


  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(api_url);
      const data = await response.json();
      setValue(data.settings.update_noti);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
    setLoading(false);
  };

  return (
    <View style={{ paddingHorizontal: 15 }}>

      {loading ?
        <ContentLoader style={styles.container}
          backgroundColor="#eaedf1"
          foregroundColor="#fafafa">
          <Rect x="0" y="0" rx="0" ry="0" width="100%" height="30" />
        </ContentLoader>
        :
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 0, justifyContent: 'center', alignItems: 'center' }}>

            <Icon name="volume-medium-outline" size={20} color={'#444'} />
          </View>
          <MarqueeText
            style={{ fontSize: 12, fontFamily: 'MavenPro-SemiBold', color: '#444', width: componentWidth }}
            speed={0.7}
            marqueeOnStart={true}
            loop={true}
            delay={0}
            consecutive={true}>
            {value}
          </MarqueeText>
        </View>
      }






    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: '#fff', // Background color for the box
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 3,
  },
});

export default RadioMarkNews;
