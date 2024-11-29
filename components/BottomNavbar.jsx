// BottomNavbar Component
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ShadowedView } from 'react-native-fast-shadow';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavbar = () => {
  const FontSize = 21;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const getTextStyle = (screenName) => ({
    fontFamily: 'MavenPro-Medium',
    fontSize: 12,
    color: isFocused && screenName === 'Account' ? '#333' : '#333',
  });

  return (
    <ShadowedView style={styles.shadow}>
      <View style={styles.navContainer}>
        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Home')}
          >
            <Icon name="home-outline" size={FontSize} color={'#454746'} />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Redeem')}
          >
            <Icon name="cash-outline" size={FontSize} color={'#454746'} />
            <Text style={styles.navText}>Redeem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Rank')}
          >
            <Icon name="trophy-outline" size={FontSize} color={'#454746'} />
            <Text style={styles.navText}>Ranks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate('Account')}
          >
            <Icon name="person-circle-outline" size={FontSize} color={'#454746'} />
            <Text style={getTextStyle('Account')}>Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ShadowedView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 0.158,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
  navContainer: {
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '100%',
    borderColor: '#E0E0E0',
  },
  navItem: { alignItems: 'center' },
  navText: { fontFamily: 'MavenPro-Medium', fontSize: 12, color: '#454746' },
});

export default BottomNavbar;
