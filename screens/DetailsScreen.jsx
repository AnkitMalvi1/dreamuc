import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import testuser from '../assets/testuser.png';
import { ShadowedView } from 'react-native-fast-shadow';
import { Bar } from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import BottomNavbar from '../components/BottomNavbar';
import { useRoute } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";


const api_url = `${API_KEY}/`;

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { slug } = route.params;
  const [details, setDetails] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}camp/${slug}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();
      setDetails(data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
    setLoading(false);
  };

  if (details === null) {
  return (
    <>
      <Navbar />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Image source={require('../assets/loadgif.gif')} style={{ height: 400, width: 200, resizeMode: 'contain' }} />
      </View>
    </>
  );
  }

  function convertDateTime(inputDateTime) {
    // Parse the input date-time string
    const parsedDateTime = parseISO(inputDateTime);

    // Format the parsed date-time to the desired format
    const formattedDateTime = format(parsedDateTime, 'dd-MM-yyyy  HH:mm:ss');

    return formattedDateTime;
  }

  const calculateRemainingTime = startTime => {
    const now = Date.now(); // Current time in milliseconds
    const endTime = new Date(startTime).getTime(); // Convert start time to milliseconds

    // Calculate remaining time in milliseconds
    const remainingTime = endTime - now;

    if (remainingTime <= 0) {
      return 'Registration Ended';
    }

    // Convert milliseconds to hours, minutes, and seconds
    const hours = Math.floor(remainingTime / (1000 * 60 * 60));
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    return `Registration Ends in ${hours}h ${minutes}m ${seconds}s`;
  };

  const progressPercentage = (joinedCount, limit) => {
    console.log(joinedCount, limit);
    const remaining = limit - joinedCount;
    const progress = remaining / limit;
    return Math.max(0, Math.min(1, 1 - progress)); // Ensure progress is between 0 and 1
  };

  const joinedCount = details.join.length;
  const limit = details?.limit;
  const progress = details && progressPercentage(joinedCount, details.limit);
  // console.log('progress', progress, joinedCount);

  const navigateToDetails = id => {
    navigation.navigate('Registeration', { id });
  };

  return (
    <>
      <Navbar />
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={styles.mainContainer}>
          {details.map(camp => (
            <TouchableWithoutFeedback
              key={camp.id}
              onPress={() => navigateToDetails(camp.id)}>
              <ShadowedView
                key={camp.id}
                style={{
                  shadowOpacity: 0.178,
                  shadowRadius: 4,
                  marginBottom: 23,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                }}>
                <View style={styles.container}>
                  <View style={styles.box1}>
                    <View style={styles.row}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#000',
                          fontFamily: 'MavenPro-Regular',
                        }}>
                        {camp.name}
                      </Text>

                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 4,
                          }}>
                          <Image
                            source={require('../assets/DreamUC-DC.png')}
                            style={styles.image}
                          />
                          <Text
                            style={{
                              color: '#333',
                              fontSize: 13,
                              fontFamily: 'MavenPro-Regular',
                            }}>
                            Entry Fee:
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                fontFamily: 'MavenPro-Regular',
                                color: '#757575'
                              }}>
                              {camp.join_prize}
                            </Text>
                          </Text>
                        </View>
                        <View style={styles.popularView}>
                          <Text style={styles.popularViewText}>
                            {camp.discount_join_prize}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.box2}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={styles.matchImg}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'MavenPro-Regular',
                            color: '#757575'
                          }}>
                          Prize Pool
                        </Text>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 26,
                            fontFamily: 'MavenPro-Medium',
                          }}>
                          {camp.win_prize} DC
                        </Text>
                      </View>
                      <View style={styles.secondRow}>
                        <View
                          style={{ flexDirection: 'row', paddingVertical: 4 }}>
                          <View style={styles.smallBox}>
                            <Text style={styles.matchText}>{camp.map}</Text>
                          </View>
                          <View style={styles.smallBox}>
                            <Text style={styles.matchText}>
                              {camp.playes_mode}
                            </Text>
                          </View>
                          <View style={styles.smallBox}>
                            <Text style={styles.matchText}>
                              {camp.game_mode}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.smallBox}>
                          <Text style={styles.matchText}>
                            {convertDateTime(camp.start_time)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Bar
                      progress={camp.joined / 100}
                      width={null}
                      borderWidth={0}
                      color="black"
                      unfilledColor="#f2f2f2"
                      height={5}
                      style={{ marginTop: 10 }}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 4,
                      }}>
                      <Text
                        style={{
                          color: 'red',
                          fontSize: 12,
                          fontFamily: 'MavenPro-Medium',
                        }}>
                        {camp.left_spots} spots left
                      </Text>
                      <Text
                        style={{ fontSize: 12, fontFamily: 'MavenPro-Medium', color: '#757575' }}>
                        {camp.limit} spots
                      </Text>
                    </View>
                  </View>

                  <View style={styles.box3}>
                    <View style={styles.lastRow}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingLeft: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontFamily: 'MavenPro-Regular',
                            color: '#757575'
                          }}>
                          {calculateRemainingTime(camp.start_time)}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={require('../assets/rightArrow.png')}
                          style={{ width: 13, height: 13, resizeMode: 'cover' }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </ShadowedView>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <BottomNavbar />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  matchText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'MavenPro-Medium',
    color: '#757575'
  },
  mainContainer: {
    padding: 15,
    paddingTop: 23,
  },
  container: {
    borderColor: '#f1f1f114',
    borderWidth: 0.6,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box1: {
    width: '100%',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    justifyContent: 'center',
  },
  box3: {
    width: '100%',
    backgroundColor: '#FFE082',
    shadowOffset: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundGradient: 'vertical',
    backgroundGradientTop: '#333333',
    backgroundGradientBottom: '#666666',
  },
  box2: {
    width: '100%',
    backgroundColor: 'white',
    shadowOffset: 20,
    shadowColor: 'black',
    shadowOpacity: 0.9,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  secondRow: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    rowGap: 3,
  },
  smallBox: {
    borderRadius: 5,
    backgroundColor: '#80808014',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 5, // Add margin between small boxes
  },
  matchImg: {
    justifyContent: 'space-around',
    alignItems: 'start',
    borderRadius: 25,
  },
  icon: {
    flex: 1,
    width: 50,
    height: 50,
  },
  popularView: {
    backgroundColor: 'green',
    fontWeight: '100',
    paddingVertical: 1,
    paddingHorizontal: 11,
    borderRadius: 5,
  },
  popularViewText: {
    color: 'white',
    fontFamily: 'MavenPro-Medium',
    fontSize: 11,
  },
  image: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
    marginRight: 5,
  },
});

export default DetailsScreen;
