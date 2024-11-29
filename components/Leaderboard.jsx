import {View, Text, Image} from 'react-native';
import React from 'react';
import {API_KEY} from "@env";

const api_url = `${API_KEY}/media/`;

const Leaderboard = ({users}) => {
  
  return (
    <View>
      {users.map((user,index) =>(
        <View
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          borderBottomWidth: 1,
          paddingVertical: 9,
          borderBottomColor: '#dedede',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: `${api_url}${user.user__user_profile}`}}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'cover',
            marginRight: 10,
            borderRadius: 20,
          }}
        />
        <Text style={{fontFamily: 'MavenPro-Regular', color: '#444'}}>
          {user.user__bgmi_username}
        </Text>
      </View>
      ))}
    </View>
  );
};

export default Leaderboard;
