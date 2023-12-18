//
import React, { useState } from 'react';
import * as ImagePickers from 'expo-image-picker';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { ImageViewer } from '../../_main/components';
import { Devider } from '../../../../components';
import { fetchGetAuthData, fetchPostAuthData } from '../../../../API';
import { useAppContext } from '../../../../context';

const ImagePicker = ({ profilePic = null }) => {
    const { userData, setUserData } = useAppContext();
    const [selectedImage, setSelectedImage] = useState(null);
    //
    const pickImageAsync = async () => {
        let result = await ImagePickers.launchImageLibraryAsync({
            mediaTypes: ImagePickers.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            // console.log('------', result.assets[0]);
            setSelectedImage(result.assets[0].uri);
            //
            const imageFile = result.assets[0];
            const imageData = imageFile.uri.split('/');
            const image = imageData[imageData.length - 1];
            //
            // console.log('name ------> ', image);
            // console.log('uri ------>', imageFile.uri);
            // console.log('type -----> ', imageFile.uri.slice(-4));
            // formData--------------------------------------------->
            const formData = new FormData();
            formData.append('profile_picture', {
                name: image,
                uri: imageFile.uri,
                type: `image/${imageFile.uri.slice(-4)}`
            });
            // post profile image; -------------------------------------------->
            const res = await fetchPostAuthData('buyer/user/update', formData);
            // console.log('profile update response ------------->', res);
            await fetchGetAuthData("buyer/user/view", setUserData);
        } else {
            alert('You did not select any image');
        }
    };
    //
    return (
        <View style={styles.container}>
            <Devider />
            <TouchableOpacity onPress={pickImageAsync} activeOpacity={0.6} >
                <ImageViewer />
            </TouchableOpacity>
            <Devider />
            <TouchableOpacity onPress={pickImageAsync} style={styles.changeBtn} activeOpacity={0.6} >
                <Text style={styles.changeImageTxt}>
                    Change Image
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        paddingBottom: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    changeBtn: {
        paddingVertical: '3%',
        paddingHorizontal: '4%',
        borderWidth: 1,
        borderRadius: 7,
        borderColor: COLORS.gray_color
    },
    changeImageTxt: {
        fontSize: 16,
        color: 'gray',
        fontWeight: '500',
        letterSpacing: 0.7,
    }
})
