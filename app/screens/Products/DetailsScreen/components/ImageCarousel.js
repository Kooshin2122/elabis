//
import React from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, ImageBackground, Platform, StyleSheet, View } from 'react-native';
import { Carousel } from 'react-native-ui-lib/src/components/carousel';
//
const ImageCarousel = ({ images = [] }) => {
    console.log("images.............", images);
    return (
        <Carousel
            loop
            pageControlPosition="over"
            // onChangePage={() => console.log('page changed')}
            showCounter={Platform.OS == "android" ? true : false}
            pageControlProps={{ color: COLORS.primary_color, enlargeActive: true, }}
        >
            {
                images.map((item, index) => (
                    <ImageBackground
                        resizeMode="cover"
                        key={index} style={styles.imagesCon}
                        source={{ uri: `https://api.elabis.app/storage/images/${images[index]}` }}
                    >
                        <View
                            style={{ width: '100%', height: '100%', backgroundColor: "rgba(33, 25, 25, 0.07)" }}
                        />
                    </ImageBackground>
                ))
            }
        </Carousel>
    )
}
//
export default ImageCarousel;
//
const styles = StyleSheet.create({
    imagesCon: {
        height: 350,
        width: '100%',
        // backgroundColor: COLORS.tertiary_color,
    }
})
//