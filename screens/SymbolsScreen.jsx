import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import {ShadowedView} from 'react-native-fast-shadow';

const SymbolsScreen = () => {
  return (
    <View>
      <Navbar />
      <ScrollView>
        <Text
          style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: 19,
            fontWeight: '900',
            color: '#333',
          }}>
          STYLISH SYMBOLS
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 20}}>
          <View>
            <ShadowedView
              style={{
                shadowOpacity: 0.1,
                shadowRadius: 1,
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 10,
                  borderRadius: 4,
                  width: 80,
                  height: 59,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>Abc</Text>
              </View>
            </ShadowedView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SymbolsScreen;
