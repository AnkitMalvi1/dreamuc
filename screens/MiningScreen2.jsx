import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import Mining from '../components/Mining'
import Navbar from '../components/Navbar'
import DtcRedeemed from '../components/DtcRedeemed'

const MiningScreen2 = () => {
  return (
    <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>
      <Navbar />
      <View style={{justifyContent: 'center', alignItems: 'center',}}>
        
      <Mining />
      </View>

      <View style={{marginBottom: 30}}>
        <DtcRedeemed />
      </View>
    </ScrollView>
  )
}

export default MiningScreen2