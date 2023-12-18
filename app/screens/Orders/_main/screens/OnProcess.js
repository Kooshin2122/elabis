//
import React, { useEffect, useState, useCallback } from 'react';
import { CardsContainer } from '../components';
import { fetchGetAuthData } from '../../../../API';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CustomButton, Devider, ListEmptyComponent, LoadingModal } from '../../../../components';
// import { readData } from '../../../../utils/localStorage/AsyncStorage';
//
const OnProcess = () => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [odersData, setOdersData] = useState([]);
    const [isUserLoging, setIsUserLoging] = useState(true);
    //
    const getOrdersDataAsync = async () => {
        try {
            setLoading(true);
            setRefresh(false);
            const response = await fetchGetAuthData("buyer/cart/order/ongoing");
            // console.log("filteredData------->", response?.data);
            setLoading(false);
            if (response.data) {
                setOdersData(response?.data);
                setIsUserLoging(true);
            }
        } catch (error) {
            setLoading(false);
            if (error == "TypeError: Cannot read property 'token_type' of null") {
                setOdersData([]);
                setIsUserLoging(false);
            }
            console.log(`error happened in the On-Process Screen ---> ${error}`);
        }
    }
    //
    useFocusEffect(useCallback(() => {
        getOrdersDataAsync();
    }, []));
    //
    // useEffect(() => {
    //     getOrdersDataAsync();
    // }, []);
    //
    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={getOrdersDataAsync} />}
        >
            {loading && <LoadingModal />}
            <Devider />
            <View style={styles.orderViewCon}>
                {
                    isUserLoging ?
                        <FlatList
                            scrollEnabled={false}
                            data={Object.values(odersData)}
                            renderItem={({ item, index }) => <CardsContainer title={`Order ${index + 1}`} products={item} isThereOrderDetail={true} showCancelCartBtn={false} />}
                            ListEmptyComponent={() => <ListEmptyComponent title="You did not order yet" message="Looks like you have not ordered anything. Go back to the products screen and add order some products. or pull-up to reload data" />}
                        />
                        :
                        <ListEmptyComponent
                            title="Sign In Please"
                            exclamationIcon={true}
                            message="Looks like you have not Signg-In yet. Click this below button to sign-in or sign-up"
                        >
                            <CustomButton
                                title="Sign-In"
                                clickHandler={() => navigate("AuthStack")}
                            />
                        </ListEmptyComponent>
                }
            </View>
            <Devider />
            {/* <Text>
                If you get notifigation
            </Text> */}
            <Devider />
        </ScrollView>
    )
}

export default OnProcess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    orderViewCon: {
        borderColor: COLORS.gray_color
    }
})
