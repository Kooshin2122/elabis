//
import React, { useState } from 'react';
import BasketCards from './BasketCards';
import { useNavigation } from "@react-navigation/core";
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomButton, Devider } from '../../../../components';
//
const CardsContainer = ({ title = "Shop Name", products = [], isThereOrderDetail = false, showTrackBtn = false, showCancelCartBtn = true, reloadData = () => { } }) => {
    // console.log("Products.........", products);
    const { navigate } = useNavigation();
    const [arrowToggle, setArrowToggle] = useState(true);
    return (
        <View style={styles.MainContainer}>
            <Pressable style={[styles.head, { borderBottomWidth: arrowToggle ? 0.8 : 0 }]} onPress={() => setArrowToggle(!arrowToggle)}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <AntDesign
                    size={18}
                    color={COLORS.black_color}
                    name={arrowToggle ? "up" : "down"}
                />
            </Pressable>
            {/* <Devider /> */}
            {
                arrowToggle &&
                <View style={styles.body}>
                    <FlatList
                        data={products}
                        scrollEnabled={false}
                        renderItem={({ item }) => <BasketCards {...item} reloadData={reloadData} showCancelCartBtn={showCancelCartBtn} isThereOrderDetail={isThereOrderDetail} />}
                    />
                    {
                        showTrackBtn &&
                        <CustomButton
                            title="Track Order"
                            clickHandler={() => navigate('Map')}
                        />
                    }
                </View>
            }
        </View>
    )
}
//
export default CardsContainer
//
const styles = StyleSheet.create({
    MainContainer: {
        borderRadius: 7,
        borderWidth: 0.7,
        marginBottom: '5%',
        borderColor: COLORS.gray_color
    },
    head: {
        padding: "4%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.8,
        borderColor: COLORS.gray_color,
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        letterSpacing: 0.7,
        color: COLORS.black_color
    },
    body: {
        padding: "4%",
    }
})
//