//
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { fetchGetData } from '../../../../API';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
//
const OnProcessCard = ({ shop_id, title, status, dateAndTime }) => {
    //
    // const [shopData, setShopData] = useState([]);
    const [loading, setLoading] = useState(false);
    //
    // const getShopInfoAsync = async () => {
    //     const shop = await fetchGetData(`buyer/shop/view/${shop_id}`)
    //     setShopData(shop?.data)
    // }
    // console.log("shopData--------->", shopData?.name);
    //
    // useEffect(() => {
    //     getShopInfoAsync();
    // }, [])
    //
    return (
        <View style={styles.container}>
            {/* icon container */}
            <View style={styles.iconContainer}>
                <Image
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 50 }}
                    source={{ uri: `https://sweyn.co.uk/storage/images/shops/${shopData?.photos}` }}
                />
            </View>
            <View style={styles.contentCon}>
                <Text style={styles.content}>
                    <Text style={styles.title}>
                        {shopData?.name + " "}
                    </Text>
                    {status}
                </Text>
                <Text style={styles.date}>
                    {dateAndTime}
                </Text>
            </View>
        </View>
    )
}
//`
export default OnProcessCard;
//
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '3%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 7,
        marginBottom: '5%',
        backgroundColor: COLORS.bg_primary,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B9C2F0',
    },
    contentCon: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        fontSize: 13,
        fontWeight: '300',
    },
    title: {
        fontSize: 15,
        marginRight: 5,
        fontWeight: '500'
    },
    date: {
        marginTop: 7,
        fontSize: 13,
        fontWeight: '300'
    }
})
//