import React from 'react'
import { sliceText } from '../../utils';
import { COLORS } from '../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { changeSelectModel, changeSelectBrand } from '../../ReduxStore/ProductScreenSlice'

const { width, height } = Dimensions.get('screen')

const CarModelCard = ({ id, modelName, modelImageUrl, style = {} }) => {
    //
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    // const { selectBrand } = useSelector(state => state.productsSlice);

    // //
    // const onSelectBrandModal = () => {
    //     navigate('ProductStack', {
    //         screen: "ModelsScreen",
    //         params: {
    //             selectModalInfo: { id, modelName, modelImageUrl }
    //         }
    //     })
    //     dispatch(changeSelectBrand({ ...selectBrand, Modal: modelName }))
    // }
    //
    return (
        <View>

        </View>
        // <TouchableOpacity onPress={onSelectBrandModal} style={[styles.container, style]} activeOpacity={0.6}>
        //     <View style={styles.imageContainer}>
        //         <Image
        //             style={styles.image}
        //             resizeMode="contain"
        //             source={modelImageUrl}
        //         />
        //     </View>
        //     <Text style={styles.modelNameText}>
        //         {sliceText(modelName, 10)}
        //     </Text>
        // </TouchableOpacity>
    )
}

export default CarModelCard;

const styles = StyleSheet.create({
    container: {
        height: 90,
        width: width / 4.6,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: COLORS.gray_color,
        alignItems: 'center',
        paddingVertical: '2%'
    },
    imageContainer: {
        width: '80%',
        height: 55,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    modelNameText: {
        fontSize: 11,
        fontWeight: '300',
        marginTop: '3%'
    }
})
