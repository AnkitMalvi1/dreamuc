import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const ErrorScreen = ({ errorMessage }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={{ width: '94%', height: '50%', objectFit: 'contain' }}
                source={require('../assets/server_down.png')} />

            <View style={{ marginTop: 15 }}>
                <Text style={styles.favtitle}>{errorMessage}</Text>
                <TouchableOpacity style={styles.homeBtn}>
                    <Text style={styles.homeBtnTxt}>Try Again
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default ErrorScreen

const styles = StyleSheet.create({
    favtitle: {

        fontFamily: 'MavenPro-Medium',
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