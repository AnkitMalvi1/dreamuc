import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const OfflineScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <Image
                style={{ width: '94%', height: '50%', objectFit: 'contain' }}
                source={require('../assets/server_down.png')} />

            <View style={{ marginTop: 15, alignItems: 'center' }}>
                <Text style={[styles.favtitle, {fontSize: 21}]}>Oops!</Text>
                <Text style={styles.favtitle}>No Internet connection found</Text>
                <Text style={styles.favtitle}>Check your connection</Text>
                <TouchableOpacity style={styles.homeBtn}>
                    <Text style={styles.homeBtnTxt}>Try Again
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default OfflineScreen;

const styles = StyleSheet.create({
    favtitle: {
        color: '#616161',
        fontFamily: 'MavenPro-SemiBold',
        fontSize: 16,
        marginBottom: 15
    },
    homeBtn: {
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 10,


    },
    homeBtnTxt: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'MavenPro-Medium',
        textTransform: 'uppercase'

    }
})