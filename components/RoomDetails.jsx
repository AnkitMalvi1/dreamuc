import { View, Text } from 'react-native';
import React from 'react';

const RoomDetails = ({ roomID }) => {
  // console.log(roomID)
  return (
    <View style={{ paddingVertical: 10}}>
      {roomID.userhai ? (
        <View style={{borderWidth: 1, borderColor: '#777', padding: 10}}>
          <Text style={{ fontFamily: 'MavenPro-Medium', color: '#555' }}>
            Join the tournament to view room details -
          </Text>
          <Text style={{ fontFamily: 'MavenPro-Regular', color: '#757575', marginTop: 10 }}>
            Room ID: {roomID.camp.room_name}
          </Text>
          <Text style={{ fontFamily: 'MavenPro-Regular', color: '#757575', marginBottom: 10 }}>
            Room Password: {roomID.camp.room_password}
          </Text>
        </View>
      ) : (
        <Text style={{ fontFamily: 'MavenPro-SemiBold', color: '#757575' }}>
          {' '}
          You haven't joined yet.
        </Text>
      )}
      

      <View style={{marginTop: 10,borderWidth: 1, borderColor: '#777', padding: 10, rowGap: 4}}>
      <Text style={{ fontFamily: 'MavenPro-Medium', color: '#555', marginBottom: 8, fontSize: 13 }}>
        Terms & Conditions -
      </Text>

      <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 13 }}>1. Using any third-party apps to gain advantage or eliminate players will result in your 'DreamUC' account being banned, and you'll lose rewards.
      </Text>
      <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 13 }}>2. The players below level 30 will not be allowed entry.
      </Text>
      <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 13 }}>3. Colluding leads to a deduction of 500 DC.
      </Text>
      <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 13 }}>4. Always take a screenshot of your match results after finishing.
      </Text>
      <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 13 }}>5. Rewards for winning will be added to your account within 5 to 120 minutes.
      </Text>
      <Text style={{ fontFamily: 'MavenPro-Regular', color: '#555', fontSize: 13 }}>6. Ensure your BGMI Username and Name are complete in your profile.
      </Text>
      </View>


    </View>
  );
};

export default RoomDetails;
