//
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fetchGetAuthData } from '../../../../API';
import { CustomButton, Devider, ListEmptyComponent, LoadingModal } from '../../../../components';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { CardsContainer, OnProcessCard, ProductStatusCard } from '../components';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
//
const Completed = () => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [odersData, setOdersData] = useState([]);
    const [isUserLoging, setIsUserLoging] = useState(true);
    //
    const { navigate } = useNavigation();
    //
    const getOrdersDataAsync = async () => {
        try {
            setLoading(true);
            setRefresh(false);
            const response = await fetchGetAuthData("buyer/cart/order/completed");
            console.log("filteredData------->", response);
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
    // useEffect(() => {
    //     getOrdersDataAsync();
    // }, []);
    useFocusEffect(useCallback(() => {
        getOrdersDataAsync();
    }, []));
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
                            data={Object.values(odersData)}
                            scrollEnabled={false}
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
        </ScrollView>
    )
}

export default Completed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding,
        backgroundColor: COLORS.bg_primary
    },
    orderViewCon: {
        // padding: "4%",
        // borderRadius: 7,
        // borderWidth: 0.7,
        // borderColor: COLORS.gray_color
    }
})
