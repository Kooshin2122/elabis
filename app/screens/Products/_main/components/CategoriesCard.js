//
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { changeSelectSubCategory } from '../../../../ReduxStore/ProductScreenSlice';
//
const CategoriesCard = ({ id, name, icon }) => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { selectSubCategory } = useSelector((state) => state.productsSlice);
    //
    const onSelectCategory = () => {
        navigate('ProductsScreen')
        dispatch(changeSelectSubCategory({ id: id, name: name }))
    }
    //
    return (
        <TouchableOpacity onPress={onSelectCategory} style={styles.container} activeOpacity={0.6}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: `https://api.elabis.app/storage/images/catgeories/${icon}` }}
                />
            </View>
            <Text style={styles.catName}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}
//
export default CategoriesCard;
//
const styles = StyleSheet.create({
    container: {
        width: '30%',
        marginBottom: '5%',
        alignItems: 'center',
    },
    imageContainer: {
        width: 55,
        height: 55,
        marginBottom: 2,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 40,
    },
    catName: {
        fontSize: 11,
        fontWeight: '300',
        textAlign: 'center',
    }
})
//