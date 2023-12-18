import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
//
const { width, height } = Dimensions.get('screen');
//
const SpecialCards = ({ specialOffersImageUrl }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={specialOffersImageUrl}
                resizeMode="cover"
            />
        </View>
    )
}

export default SpecialCards;

const styles = StyleSheet.create({
    container: {
        height: 135,
        width: width / 1.9,
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%'
    }
})
