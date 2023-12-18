import React, { useEffect, useMemo, useState } from 'react';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeSelectCategory } from '../../../../ReduxStore/ProductScreenSlice'
import { fetchGetData } from '../../../../API';
import { useAppContext } from '../../../../context';

const SideBarCards = ({ id, name, icon, setSubCatLoading = () => { } }) => {
    const dispatch = useDispatch();
    const { setSubCategoriesData } = useAppContext();
    const { selectCategory } = useSelector(state => state.productsSlice);
    // Main Function
    const onSelectCategory = async () => {
        try {
            setSubCategoriesData([]);
            dispatch(changeSelectCategory({ id: id, name: name }));
            setSubCatLoading(true);
            const subCategoryRes = await fetchGetData(`buyer/category/view/main/${id}`);
            setSubCatLoading(false);
            setSubCategoriesData(subCategoryRes.data);
        } catch (error) {
            setSubCatLoading(false);
        }
    }
    //
    useEffect(() => {
    }, [])
    // get active category
    const activeCategory = useMemo(() => {
        return selectCategory.name == name;
    }, [selectCategory]);
    // JSX
    return (
        <Pressable onPress={onSelectCategory} style={styles.container}>
            <View style={activeCategory ? styles.activeImageContainer : styles.inActiveImageContainer}>
                <Image
                    source={{ uri: `https://api.elabis.app/storage/images/categories/${icon}` }}
                    resizeMode="stretch"
                    style={{ width: 50, height: 50, borderRadius: 55 / 2, }}
                />
            </View>
            <Text style={activeCategory ? styles.activeText : styles.inActiveText}>
                {name}
            </Text>
        </Pressable>
    )
}

export default SideBarCards;

const styles = StyleSheet.create({
    container: {
        minHeight: 70,
        width: '100%',
        marginTop: 12,
        marginBottom: 8,
    },
    activeImageContainer: {
        width: 55,
        height: 55,
        marginBottom: 2,
        borderRadius: 55 / 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.tertiary_color,
    },
    activeText: {
        fontSize: 11,
        textAlign: 'center',
        color: COLORS.primary_color,
    },
    inActiveImageContainer: {
        width: 55,
        height: 55,
        marginBottom: 2,
        borderRadius: 55 / 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    inActiveText: {
        fontSize: 11,
        fontWeight: '300',
        textAlign: 'center',
    },

})
