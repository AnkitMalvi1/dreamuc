import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import HighestDC from '../components/HighestDC';
import RedeemedR from '../components/RedeemedR';
import { ShadowedView } from 'react-native-fast-shadow';
import BottomNavbar from '../components/BottomNavbar';



const RankScreen = () => {
  const [showHighestDC, setShowHighestDC] = useState(true);
  const [showRedeemed, setShowRedeemed] = useState(false);




  const highestDCStyle = showHighestDC
    ? {
      backgroundColor: '#fff',
      color: '#000',
      paddingVertical: 7,
      paddingHorizontal: 20,
      borderRadius: 3,
      fontSize: 14,
      width: 150,
      textAlign: 'center',
      fontFamily: 'MavenPro-SemiBold',
    }
    : {
      color: '#fff',
      width: 150,
      textAlign: 'center',
      fontFamily: 'MavenPro-SemiBold',
    };
  const redeemedStyle = showRedeemed
    ? {
      backgroundColor: '#fff',
      color: '#000',
      paddingVertical: 7,
      paddingHorizontal: 20,
      borderRadius: 3,
      fontSize: 14,
      width: 150,
      textAlign: 'center',
      fontFamily: 'MavenPro-SemiBold',
    }
    : {
      color: '#fff',
      width: 150,
      textAlign: 'center',
      fontFamily: 'MavenPro-SemiBold',
    };

  return (
    <View style={{ height: '100%' }}>
      <Navbar />
      <View style={{ backgroundColor: '#fff', height: '95%' }}>
        <View
          style={{
            backgroundColor: '#111',
            paddingVertical: 18,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '900',
              fontSize: 20,
              color: '#fff',
              marginTop: -5,
              fontFamily: 'MavenPro-SemiBold',
              letterSpacing: 2,
            }}>
            LEADERBOARD
          </Text>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 20 }}>
              <ShadowedView
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
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderWidth: 1,
                    borderColor: '#333',
                    backgroundColor: '#222',
                    paddingVertical: 7,
                    paddingHorizontal: 0,
                    borderRadius: 4,
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowRedeemed(false);
                      setShowHighestDC(true);
                    }}>
                    <Text style={highestDCStyle}>Highest DC</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowHighestDC(false);
                      setShowRedeemed(true);
                    }}>
                    <Text style={({}, redeemedStyle)}>Redeemed ₹</Text>
                  </TouchableOpacity>
                </View>
              </ShadowedView>
            </View>
          </View>


        </View>
        {showHighestDC && <RedeemedR />}
        {showRedeemed && <HighestDC />}
      </View>
    </View>
  );
};

export default RankScreen;
