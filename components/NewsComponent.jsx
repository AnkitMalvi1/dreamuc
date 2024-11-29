import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ShadowedView} from 'react-native-fast-shadow';
import {API_KEY} from "@env";


const api_url = `${API_KEY}`;


const NewsComponent = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetchCampData();
  }, []);

  

  const fetchCampData = async () => {
    try {
      const response = await fetch(`${api_url}`);
      const data = await response.json();
      const filteredData = data.homepage_buttons.filter(
        item => item.mainbtns === 'EVENT1',
      );
      setValues(filteredData);
    } catch (error) {
      console.error('Error fetching camp data:', error);
    }
  };
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {values.map(value => (
        <TouchableOpacity
          style={styles.box}
          key={value.id}
          onPress={() => {
            navigation.navigate('Polls');
          }}>
          <Image
            style={styles.image}
            source={{
              uri: `${api_url}${value.img}`,
            }}
          />
          <Text style={styles.text}>{value.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#222',
  },
  box: {
    alignItems: 'center',
  },
  image: {
    width: 22,
    height: 22,
    marginBottom: 5,
  },
  text: {
    fontSize: 11,
    color: 'white',
    fontFamily: 'MavenPro-SemiBold',
  },
});

export default NewsComponent;
