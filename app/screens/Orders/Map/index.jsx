//
import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { SubHeader } from '../../../components';
import { useAppContext } from '../../../context';
import MapView from 'react-native-maps';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
//
const MapScreen = () => {
    //
    const { userLocation, setUserLocation } = useAppContext();
    //
    const getPermisionAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            Location.getCurrentPositionAsync().then(location => {
                console.log("Location-------->", location);
                setUserLocation(location);
            }).catch((error) => console.log("error--", error))
        } catch (error) {
            console.log("error happen when getting permision in the expo");
        }
    }
    //
    useEffect(() => {
        getPermisionAsync();
    }, []);
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Track Order" />
            <MapView />
        </SafeAreaView>
    )
}
//
export default MapScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    }
})
//

// "config": {
//     "googleMapsApiKey": "AIzaSyBHB6AZMc3WTBqQQ4_D0V5jXKPj9J-rinU"
//   }