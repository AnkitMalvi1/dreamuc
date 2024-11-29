import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Bar } from 'react-native-progress';
import Winnings from '../components/Winnings';
import Leaderboard from '../components/Leaderboard';
import RoomDetails from '../components/RoomDetails';
import WatchLive from '../components/WatchLive';
import BottomNavbar from '../components/BottomNavbar';
import { ShadowedView } from 'react-native-fast-shadow';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";


const api_url = `${API_KEY}/`;

const MatchRegister = () => {
  const [selectedTab, setSelectedTab] = useState('Winnings');
  const [details, setDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [checkJoin, setCheckJoin] = useState('JOIN');
  const [showDC, setShowDC] = useState('DC');
  const [joined, setjoined] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    fetchDetails();
    // fetchJoins();
  }, [joined]);

  const fetchDetails = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(
        `${api_url}singlecamp/${id}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        },
      );
      const data = await response.json();
      setDetails(data);
      // console.log(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
    setLoading(false);
  };

  const fetchJoins = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}camp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({ camp_id: id }),
      });
      const data = await response.json();
      setjoined(true);
      console.log(data);
      if (data.Failed) {
        ToastAndroid.show(`${data.Failed}`, ToastAndroid.LONG);
      }

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

  const handleTabPress = tabName => {
    setSelectedTab(tabName);
  };

  const progressPercentage = (joinedCount, limit) => {
    // console.log(joinedCount, limit);
    const remaining = limit - joinedCount;
    const progress = remaining / limit;
    return Math.max(0, Math.min(1, 1 - progress)); // Ensure progress is between 0 and 1
  };

  // const joinedCount = details.join.length;
  // const limit = details?.limit;
  // const progress = details && progressPercentage(joinedCount, details.limit);

  return (
    <View style={{ height: '100%' }}>
      <Navbar />
      <ScrollView
        style={{
          paddingVertical: 20,
          backgroundColor: '#fff',
        }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 12, color: '#444' }}>Prize Pool</Text>
          <Text
            style={{
              fontSize: 28,
              color: '#333',
              fontFamily: 'MavenPro-Medium',
            }}>
            {details.camp.win_prize} DC
          </Text>
          <Bar
            progress={details.joined / 100}
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
              marginTop: 6,
            }}>
            <Text
              style={{
                fontSize: 11,
                color: 'red',
                fontFamily: 'MavenPro-Medium',
              }}>
              {details.left_spots} spots left
            </Text>
            <Text style={{ fontSize: 11, fontFamily: 'MavenPro-Medium' }}>
              {details.limit} spots
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'green',
                paddingVertical: 7,
                borderRadius: 5,
                justifyContent: 'center',
              }}
              onPress={fetchJoins}>
              {details.userhai ? (
                <Text
                  style={{
                    color: '#fff',
                    marginRight: 5,
                    fontFamily: 'MavenPro-Medium',
                  }}>
                  Joined
                </Text>
              ) : (
                <>

                  {details.left_spots === 0 ? (
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'MavenPro-Medium',
                      }}>
                      Registration Ended
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={{
                          color: '#fff',
                          marginRight: 5,
                          fontFamily: 'MavenPro-Medium',
                        }}>
                        {checkJoin}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          textDecorationLine: 'line-through',
                          fontFamily: 'MavenPro-Medium',
                        }}>
                        {details.camp.join_prize}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          marginLeft: 5,
                          fontFamily: 'MavenPro-Medium',
                        }}>
                        {details.camp.discount_join_prize} {showDC}
                      </Text>
                    </>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ borderTopWidth: 1, borderTopColor: '#dedede' }}>
          <ShadowedView
            style={{
              shadowOpacity: 0.1,
              shadowRadius: 4,
              shadowOffset: {
                width: 0,
                height: 0,
              },
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderBottomWidth: 1,
                borderBottomColor: '#dedede',
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity
                onPress={() => handleTabPress('Winnings')}
                style={{
                  borderBottomWidth: selectedTab === 'Winnings' ? 4 : 0,
                  borderColor: 'green',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontFamily: 'MavenPro-Regular',
                    color: '#333',
                    fontSize: 13,
                  }}>
                  Winnings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabPress('Leaderboard')}
                style={{
                  borderBottomWidth: selectedTab === 'Leaderboard' ? 4 : 0,
                  borderColor: 'green',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontFamily: 'MavenPro-Regular',
                    color: '#333',
                    fontSize: 13,
                  }}>
                  Leaderboard
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabPress('Room Details')}
                style={{
                  borderBottomWidth: selectedTab === 'Room Details' ? 4 : 0,
                  borderColor: 'green',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontFamily: 'MavenPro-Regular',
                    color: '#333',
                    fontSize: 13,
                  }}>
                  Room Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabPress('Watch Live')}
                style={{
                  borderBottomWidth: selectedTab === 'Watch Live' ? 4 : 0,
                  borderColor: 'green',
                  paddingVertical: 8,
                }}>
                <Text
                  style={{
                    fontFamily: 'MavenPro-Regular',
                    color: '#333',
                    fontSize: 13,
                  }}>
                  Watch Live
                </Text>
              </TouchableOpacity>
            </View>
          </ShadowedView>

          {/* Content for the selected tab */}
          <View style={{ padding: 10 }}>
            {selectedTab === 'Winnings' && (
              <View style={{}}>
                <Winnings wins={details.Winnings} />
              </View>
            )}
            {selectedTab === 'Leaderboard' && (
              <View style={{}}>
                <Leaderboard users={details.joined_users} />
              </View>
            )}
            {selectedTab === 'Room Details' && (
              <View style={{}}>
                <RoomDetails roomID={details} />
              </View>
            )}
            {selectedTab === 'Watch Live' && (
              <View style={{}}>
                <WatchLive />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
};

export default MatchRegister;
