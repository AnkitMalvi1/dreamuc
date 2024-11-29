import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from './Navbar';
import {useRoute} from '@react-navigation/native';

const Winnings = ({wins}) => {

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#dedede',
          paddingVertical: 9,
        }}>
        <Text style={{fontFamily: 'MavenPro-SemiBold', color: '#333'}}>
          Rank
        </Text>
        <Text style={{fontFamily: 'MavenPro-SemiBold', color: '#333'}}>
          Prize Pool
        </Text>
      </View>

        {wins.map(win => (
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            paddingVertical: 9,
            borderBottomColor: '#dedede',
          }}
          key={win.id}>
          <Text style={{fontFamily: 'MavenPro-Regular', color: '#444'}}>
            {win.rank}
          </Text>
          <Text style={{fontFamily: 'MavenPro-Regular', color: '#444'}}>
            {win.amount} DC
          </Text>
        </View>
        ))}
    </View>
  );
};

export default Winnings;
