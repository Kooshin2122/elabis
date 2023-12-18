//
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { changeActiveTab, changeSelectCategory } from '../../../../ReduxStore/ProductScreenSlice';
import { fetchGetData } from '../../../../API';
import { useAppContext } from '../../../../context';
//
const { width, height } = Dimensions.get('screen');
//
const AvailableCategoryCard = ({ id, name, icon, categoryName, categoryImageUrl }) => {
    //
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { setSubCategoriesData } = useAppContext();
    //
    const navigateProductsScreen = async () => {
        dispatch(changeSelectCategory({ id: id, name: name }));
        const subCategoryRes = await fetchGetData(`buyer/category/view/main/${id}`);
        setSubCategoriesData(subCategoryRes.data);
        navigate("ProductStack", {
            screen: "MainProductsScreen",
            params: {
                screen: "Categories"
            }
        })
    }
    console.log(`https://api.elabis.app/storage/images/categories/${icon}`);
    //
    return (
        <TouchableOpacity onPress={navigateProductsScreen} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: `https://api.elabis.app/storage/images/categories/${icon}` }}
                />
            </View>
            <Text style={styles.itemName}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}

export default AvailableCategoryCard;

const styles = StyleSheet.create({
    container: {
        gap: 6,
        width: '23%',
        marginBottom: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        height: 70,
        width: "80%",
        borderRadius: 5,
        borderWidth: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.gray_color,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    itemName: {
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'center'
    }
})
