import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import { ShadowedView } from 'react-native-fast-shadow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from "@env";
import { ToastAndroid } from 'react-native';
import SettingsContext from '../SettingsContext';


const api_url = `${API_KEY}/`;

const PollsScreen = () => {

  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voted, setvoted] = useState(false);
  const [clickedPollId, setClickedPollId] = useState(null);
  const { fetchRedeemCoins } = useContext(SettingsContext);

  useEffect(() => {
    fetchPolls();
  }, [voted]);

  const fetchPolls = async () => {
    const token = await AsyncStorage.getItem('access_token');
    try {
      const response = await fetch(`${api_url}polls/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      const data = await response.json();
      setPolls(data.results);
      // console.log(data.results)
      setLoading(false);
    } catch (error) {
      console.error('Error fetching alerts:', error);
      setLoading(false);
    }
  };

  const clickFunc = (pollId) => {
    setClickedPollId(pollId);
  };


  const voteChoice = async (pollId, choiceId) => {
    const token = await AsyncStorage.getItem('access_token');
    setvoted(false);
    try {
      const response = await fetch(`${api_url}polls/${pollId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify({
          question: pollId,
          choice: choiceId,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        // Update the polls state to reflect the changes
        setPolls((prevPolls) =>
          prevPolls.map((poll) =>
            poll.id === pollId ? { ...poll, ...data } : poll
          )
        );
        setvoted(true);
        fetchRedeemCoins();
        // Alert.alert('Success', 'Your vote has been recorded!');
        ToastAndroid.show("Your vote has been submitted", ToastAndroid.SHORT);
      } else {
        const errorData = await response.json();
        // console.error('Error response:', errorData);
        // Alert.alert('Error', 'Failed to submit your vote.');
        ToastAndroid.show(errorData.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      // console.error('Error voting:', error);
      // Alert.alert('Error', 'Failed to submit your vote.');
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };



  return (
    <>
      <Navbar />
      <ScrollView style={{ paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#fff' }}>

        {loading ? (
          <View style={{ height: '92%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Image source={require('../assets/loadgif.gif')} style={{ height: 400, width: 200, resizeMode: 'contain' }} />
          </View>
        ) :

          polls.map((poll) => {
            // const totalVotes = poll.choices.reduce((acc, curr) => acc + curr.votes, 0);
            return (
              <View style={{ marginBottom: 10 }} key={poll.id}>
                <ShadowedView
                  style={{
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                  }}
                  key={poll.id}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 5,
                      backgroundColor: 'white',
                      borderColor: '#E0E0E0',
                      padding: 15,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontFamily: 'MavenPro-Medium',
                        fontSize: 15,
                      }}>
                      {poll.question_text}
                    </Text>
                    <View style={{ marginVertical: 10, rowGap: 10 }}>
                      {poll.choices.map((choice) => {
                        // const choicePercentage = poll. === 0 ? 0 : ((choice.votes / totalVotes) * 100).toFixed(2);
                        // Calculate the width of the background based on the percentage
                        const backgroundWidth = choice.percentages;
                        return (
                          <View
                            key={choice.id}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginBottom: 5,
                              flexWrap: 'nowrap',
                              justifyContent: 'space-between',
                              borderColor: '#E0E0E0',
                              borderWidth: 1,
                              borderRadius: 2,
                              // borderRadius: 5,

                            }}>
                            <TouchableOpacity
                              style={{
                                // backgroundColor: '#a3a3a3',
                                width: `${backgroundWidth}%`, // Apply the dynamic width to the background
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                // borderRadius: 5,
                                // marginRight: 10,
                                backgroundColor: poll.user_has_voted ? poll.user_voted_choices == choice.id ? '#ffa5009e' : '#80808014' : 'transparent',
                                flexWrap: 'nowrap',// Add some margin between the background and text
                              }}
                              onPress={() => {
                                clickFunc(poll.id);
                                voteChoice(poll.id, choice.id);
                              }}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'MavenPro-Regular',
                                  width: 300,
                                }}>
                                {choice.choice_text}
                              </Text>
                            </TouchableOpacity>

                            <Text
                              style={{
                                color: 'black',
                                fontFamily: 'MavenPro-Regular',
                                position: 'absolute',
                                right: 10,
                              }}>
                              {poll.user_has_voted && choice.percentages + `%`}
                            </Text>

                          </View>
                        );
                      })}

                    </View>

                    <Text style={{ fontFamily: 'MavenPro-Medium', fontSize: 13 }}>
                      Total Votes: {poll.total_votes}
                    </Text>
                  </View>
                </ShadowedView>
              </View>
            );
          })


        }


      </ScrollView>
    </>
  );
};

export default PollsScreen;
