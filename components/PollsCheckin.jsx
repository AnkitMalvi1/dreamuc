import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from "@env";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'


const api_url = `${API_KEY}`;


const PollsCheckin = () => {
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCampData();
  }, []);



  const fetchCampData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api_url}`);
      const data = await response.json();
      const filteredData = data.homepage_buttons.filter(
        item => item.mainbtns === 'EVENT2',
      );
      setValues(filteredData);
    } catch (error) {
      console.error('Error fetching camp data:', error);
    }
    setLoading(false);
  };
  const navigation = useNavigation();

  const navigateToScreen = screen_name => {
    navigation.navigate(`${screen_name}`);
  };

  return (
    <>
      {loading ?
        <View style={{ paddingHorizontal: 15, marginTop: 20, marginBottom: 20 }}>
          <ContentLoader
            backgroundColor="#eaedf1"
            foregroundColor="#fafafa"
            width={'100%'}
            height={60}>
            <Rect x="0" y="0" rx="0" ry="0" width="100%" height="100" />

          </ContentLoader>
        </View>
        :
        <ScrollView contentContainerStyle={styles.container}>
          {values.map(value => (
            <TouchableOpacity
              style={[
                styles.box,
                value.background_color && { backgroundColor: value.background_color }, // Set dynamic background color if available
                value.border_color && { borderColor: value.border_color }, // Set dynamic border color if available
              ]}
              key={value.id}
              onPress={() => navigateToScreen(value.urlpath)}>
              <Image
                style={styles.image}
                source={{
                  uri: `${api_url}${value.img}`,
                }}
              />
              <Text style={styles.text}>{value.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      }

    </>

  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    columnGap: 4,
    backgroundColor: '#f7f8fa',
  },
  box: {
    width: '23%', // Adjust width percentage according to your layout requirements
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
  },
  image: {
    width: 20,
    height: 20,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 10,
    color: 'black',
    fontFamily: 'MavenPro-SemiBold',
  },
  box2: {
    backgroundColor: '#e2f2ff',
    borderColor: '#64B5F6',
    borderWidth: 1,
  },
  box5: {
    backgroundColor: '#eee5fe',
    borderColor: '#b396fd',
    borderWidth: 1,
  },
  box3: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
    borderWidth: 1,
  },
  box4: {
    backgroundColor: '#fef3e0',
    borderColor: '#FFB74D',
    borderWidth: 1,
  },
  box1: {
    backgroundColor: '#FCE4EC',
    borderColor: '#F06292',
    borderWidth: 1,
  },
  box6: {
    backgroundColor: '#E0E0E0',
    borderColor: '#757575',
    borderWidth: 1,
  },
  box7: {
    backgroundColor: '#E8EAF6',
    borderColor: '#7986CB',
    borderWidth: 1,
  },
  box8: {
    backgroundColor: '#FBE9E7',
    borderColor: '#FF8A65',
    borderWidth: 1,
  },
});

export default PollsCheckin;
