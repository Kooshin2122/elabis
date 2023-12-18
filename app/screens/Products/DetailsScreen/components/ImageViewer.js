//
import React, { useEffect, useState } from 'react';
import { fetchGetData } from '../../../../API';
import { SubHeader } from '../../../../components';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//
const { width, height } = Dimensions.get('screen');
//
const ImageViewer = ({ UPID }) => {
    const [images, setImages] = useState([]);
    const [selectImage, setSelectImage] = useState();
    const getImagesAsync = async () => {
        const res = await fetchGetData(`buyer/products/images/${UPID}`);
        setImages(res.data);
        setSelectImage(res.data[0])
    }
    //
    useEffect(() => {
        getImagesAsync();
    }, [UPID])
    //
    return (
        <View style={styles.container}>
            {/* main image */}
            <View style={styles.mainImage}>
                <Image
                    resizeMode="cover"
                    style={styles.imageStyle}
                    source={{ uri: `https://sweyn.co.uk/storage/images/${selectImage}` }}
                />
            </View>
            {/* small images */}
            <View style={styles.subImages} >
                <FlatList
                    horizontal
                    data={images}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <SubImageViewer key={item.id} index={index} item={item} images={images} changeMainImage={setSelectImage} style={{ borderColor: selectImage == item ? COLORS.primary_color : COLORS.gray_color }} />
                        )
                    }}
                />
            </View>
        </View>
    )
}
//
export default ImageViewer;
//
const SubImageViewer = ({ item, index, images, style = {}, changeMainImage = () => { } }) => {
    const onSelectSubImage = () => {
        changeMainImage(images[index])
    }
    return (
        <Pressable onPress={onSelectSubImage} style={[styles.subImage, { ...style }]}>
            <Image
                resizeMode="contain"
                style={{ width: '80%', height: '80%' }}
                source={{ uri: `https://sweyn.co.uk/storage/images/${item}` }}
            />
        </Pressable>
    )
}
//
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height / 2.4,
        backgroundColor: COLORS.bg_tertiary,
    },
    mainImage: {
        flex: 1,
        alignItems: 'center',
    },
    imageStyle: {
        width: '90%',
        height: '97%',
        // backgroundColor: 'red'
    },
    subImages: {
        flex: 0.28,
        paddingHorizontal: '1%',
        // backgroundColor: 'blue'  
    },
    subImage: {
        height: 70,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        width: width / 4.5,
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    }
})



