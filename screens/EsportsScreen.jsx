import {View, Text} from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import UpcomingMatches from '../components/UpcomingMatches';
import BottomNavbar from '../components/BottomNavbar';

const EsportsScreen = () => {
  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
      <Navbar />
      <View style={{marginTop: 10}}>
        <UpcomingMatches />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <BottomNavbar />
      </View>
    </View>
  );
};

export default EsportsScreen;
