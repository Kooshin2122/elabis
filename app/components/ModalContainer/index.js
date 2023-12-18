//
import React from 'react';
import { Dimensions, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

const ModalContainer = ({ children }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export default ModalContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000097",
        zIndex: 100,
        width: "100%",
        height: height,
        paddingHorizontal: 30,
    },
})
