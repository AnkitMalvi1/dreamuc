import React, { useContext, useState, useEffect } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, Image, Linking, ScrollView, BackHandler } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import SettingsContext from '../SettingsContext';

const UpdateDialog = ({ isVisible, onClose }) => {
    const { settings } = useContext(SettingsContext);
    const [appVersion, setAppVersion] = useState('');

    useEffect(() => {
        // Get the app version from DeviceInfo
        const version = DeviceInfo.getVersion();
        setAppVersion(version);
    }, []);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isVisible) {
                return true; // Prevent default back button behavior
            }
            return false;
        });

        return () => backHandler.remove(); // Clean up the event listener
    }, [isVisible]);

    const shouldShowDialog = settings.app_version && settings.app_version !== appVersion;

    if(!shouldShowDialog){
        return null;
    }
    
    return (
        <Modal
            visible={isVisible && shouldShowDialog}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { }}
        >
            <View style={styles.container}>



                <View style={styles.main}>
                    <View style={{ width: '100%', height: 140 }}>
                        <Image source={require('../assets/update.jpg')} style={{ width: '100%', height: '100%', borderTopRightRadius: 14, borderTopLeftRadius: 14 }}></Image>
                    </View>
                    <View style={{ backgroundColor: 'white', width: '100%', alignItems: 'center', padding: 10, height: '58%' }}>
                        <Text style={styles.heading}>New app Update available</Text>
                        <View>
                            <Text style={styles.heading2}>About Update V{settings.app_version}</Text>

                        </View>
                        <ScrollView style={{ height: '80%', }}>
                                <Text style={styles.content}>{settings.update_content}</Text>
                        </ScrollView>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#000', width: '90%', padding: 14, borderRadius: 10, marginBottom: !settings.force_update ? 0 : 10,
                        }}
                        onPress={()=>Linking.openURL(settings.app_link)}>
                            <Text style={{ color: 'white', textAlign: 'center', fontFamily: 'MavenPro-Medium', fontSize: 16 }}>Update Now</Text>
                        </TouchableOpacity>

                           { !settings.force_update && <TouchableOpacity onPress={onClose}>
                                <Text style={{ color: '#000', fontFamily: 'MavenPro-Medium', marginVertical: 20, fontSize: 16 }}>Later</Text>
                            </TouchableOpacity>}
                    </View>
                </View>

            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    main: {
        elevation: 20,
        backgroundColor: 'white',
        borderRadius: 14,
        width: '90%',
        height: '80%',
        alignSelf: 'center',
        shadowColor: '#171717',

    },
    heading: {
        fontSize: 22,
        color: '#000',
        textAlign: 'center',
        margin: 15,
        alignItems: 'flex-start',
        // fontWeight: '500',

        fontFamily: 'MavenPro-Bold',
    },
    heading2:
    {
        fontFamily: 'MavenPro-Bold',
        color: '#555',
    },
    content: {
        lineHeight: 22,
        marginTop: 20,
        color: '#000',
        fontFamily: 'MavenPro-Medium',
    }
}
)



export default UpdateDialog;