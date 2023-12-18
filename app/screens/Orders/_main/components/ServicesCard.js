//
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';

const ServicesCard = ({ id, serviceName, imageUrl }) => {
    return (
        <View style={styles.container}>
            <Image
                source={imageUrl}
                resizeMode="cover"
                style={styles.image}
            />
        </View>
    )
}

export default ServicesCard;

const styles = StyleSheet.create({
    container: {
        width: '32%',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.primary_color
    },
    image: {
        width: '100%',
        height: '100%'
    }
})
