import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';
import { API_KEY } from "@env";
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'


const api_url = `${API_KEY}`;

const UpcomingMatches = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(false);
  let navigation = useNavigation();

  useEffect(() => {
    fetchCampData();
  }, []);



  const fetchCampData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api_url}`);
      const data = await response.json();
      setCamps(data.camps);
    } catch (error) {
      console.error('Error fetching camp data:', error);
    }
    setLoading(false);
  };

  const navigateToDetails = slug => {
    navigation.navigate('Details', { slug });
  };

  return (
    <>
      <View style={styles.mainHeadingView}>
        <Text style={styles.mainHeading}>Upcoming Matches</Text>
      </View>

      {loading && <View style={[styles.mainContainer, { height: 308 }]}>
        <ContentLoader
          backgroundColor="#eaedf1"
          foregroundColor="#fafafa">
          <Rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </ContentLoader>
      </View>}

      {!loading && camps.length == 0 &&
        <View style={{ margin: 10, borderWidth: 1, borderColor: '#777', borderRadius: 10, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Image source={require('../assets/esports_logo.png')} style={{ height: 100, width: 100, resizeMode: 'cover' }} />
          <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#555' }}>NO MATCHES AVAILABLE YET.</Text>
        </View>
      }

      {camps.map(camp => (
        <TouchableWithoutFeedback
          key={camp.id}
          onPress={() => navigateToDetails(camp.slug)}>
          <View style={styles.mainContainer}>
            <ShadowedView
              style={{
                shadowOpacity: 0.109,
                shadowRadius: 4,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
              }}>
              <View style={styles.container}>
                {/* First Box */}
                <View style={styles.box1}>
                  <View style={styles.row}>
                    <Text style={styles.allText}>{camp.name}</Text>

                    <View style={styles.popularView}>
                      <Text style={styles.popularViewText}>{camp.tag}</Text>
                    </View>
                  </View>
                </View>

                {/* Second Box */}
                <View style={styles.box2}>
                  <View style={styles.secondRow}>
                    <View style={styles.smallBox}>
                      <Text style={styles.matchText}>{camp.map_name}</Text>
                    </View>
                    <View style={styles.smallBox}>
                      <Text style={styles.matchText}>{camp.player}</Text>
                    </View>
                    <View style={styles.smallBox}>
                      <Text style={styles.matchText}>{camp.player_view}</Text>
                    </View>
                  </View>
                  <View style={styles.matchImg}>
                    <Image
                      source={{
                        uri: `${api_url}${camp.thumbnail}`,
                      }}
                      resizeMode="cover"
                      style={styles.icon}
                    />
                  </View>
                </View>

                {/* Third Box */}
                <View style={styles.box3}>
                  <View style={styles.lastRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{
                          uri: `${api_url}${camp.win_prize_image}`,
                        }}
                        style={styles.image}
                      />
                      <Text
                        style={{
                          color: '#222',
                          fontFamily: 'MavenPro-SemiBold',
                          fontSize: 12,
                        }}>
                        Win Upto {camp.win_prize} DC
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{
                          uri: `${api_url}${camp.reward_type_image}`,
                        }}
                        style={styles.image}
                      />
                      <Text
                        style={{
                          color: '#222',
                          fontFamily: 'MavenPro-SemiBold',
                          fontSize: 12,
                        }}>
                        {camp.reward_type}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ShadowedView>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  mainHeadingView: {
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 15,
  },
  mainHeading: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'MavenPro-SemiBold',
  },
  allText: {
    color: '#222',
    fontFamily: 'MavenPro-SemiBold',
  },
  matchText: {
    color: 'black',
    fontFamily: 'MavenPro-Medium',
    fontSize: 12,
  },
  mainContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  container: {
    borderColor: '#f1f1f114',
    borderWidth: 0.6,
    borderRadius: 6,
    backgroundColor: '#f2f2f2',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box1: {
    width: '100%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  box3: {
    width: '100%',
    backgroundColor: 'white',
    shadowOffset: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#d9e9ffba',
    // borderBottomStartRadius: 6,
    // borderBottomEndRadius: 6,
    borderRadius: 4,
  },
  box2: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    shadowOffset: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    justifyContent: 'space-between',
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallBox: {
    borderRadius: 4,
    backgroundColor: '#80808014',
    padding: 5,
    marginHorizontal: 5, // Add margin between small boxes
  },
  matchImg: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  icon: {
    flex: 1,
    width: 48,
    height: 48,
  },
  popularView: {
    backgroundColor: '#f0ffff',
    fontWeight: '300',
    padding: 3,
    borderRadius: 3,
  },
  popularViewText: {
    color: '#444',
    fontSize: 11,
    fontFamily: 'MavenPro-Medium',
  },
  image: {
    width: 14,
    height: 14,
    resizeMode: 'cover',
    marginRight: 5,
  },
});

export default UpcomingMatches;
