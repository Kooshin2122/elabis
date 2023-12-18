//
import React, { useState } from 'react';
import Lottie from 'lottie-react-native';
import { Alert, Modal, StyleSheet, View, Dimensions, StatusBar, Text } from 'react-native';
//
const { width, height } = Dimensions.get('screen');
//
const LoadingModal = () => {
    return (
        // <Modal
        //     transparent={true}
        // >
        <View style={styles.container} >
            <View style={styles.centeredView}>
                <Lottie source={require('./loading.json')} autoPlay loop />
            </View>
        </View>
        // </Modal>
    );
};
//
const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: height,
    },
    centeredView: {
        width: width,
        justifyContent: "flex-start",
        backgroundColor: "rgba(255, 255, 255, 0.82)",
        height: height / 1.3 - StatusBar.currentHeight * 4,
    },
});
//
export default LoadingModal;
//