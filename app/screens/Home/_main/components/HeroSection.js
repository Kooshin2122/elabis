//
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import heroImage from '../../../../../assets/images/heroImg.jpeg';
import heroImg6 from '../../../../../assets/images/heroImg6.jpeg';
import DiscountImg from '../../../../../assets/images/heroDis.png';

import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
//
const HeroSection = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={heroImage} resizeMode="cover" style={styles.heroImg}>
                <LinearGradient
                    colors={['#ffffff', 'transparent']}
                    style={styles.background}
                />
            </ImageBackground>
            <View style={styles.cardCon}>
                <ImageBackground source={heroImg6} resizeMode="cover" style={styles.discountCard}>
                    <View style={styles.contentCon}>
                        <View style={{ flex: 1 }}>
                            <Text>
                                Get Discount
                            </Text>
                        </View>
                        <Image
                            resizeMode="contain"
                            source={DiscountImg}
                            style={{ width: 130, height: 120 }}
                        />
                    </View>
                    <View opacity={0.4} style={styles.opacityBg} />
                </ImageBackground>
            </View>
        </View>
    )
}

export default HeroSection

const styles = StyleSheet.create({
    container: {
        maxHeight: 230,
        // backgroundColor: 'blue'
    },
    heroImg: {
        width: '100%',
        height: 150,
    },
    background: {
        height: 30
    },
    cardCon: {
        top: -80,
        position: 'relative',
        paddingHorizontal: '4%',
    },
    discountCard: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#9baec8'
    },
    opacityBg: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000',
    },
    contentCon: {
        zIndex: 1,
        width: '100%',
        height: '100%',
        padding: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between'
    }
})
