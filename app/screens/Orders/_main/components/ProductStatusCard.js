//
import React, { useEffect, useState } from 'react';
import { sliceText } from '../../../../utils';
import { useNavigation } from '@react-navigation/core';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('screen');

const ProductStatusCard = ({ id, name, price, status, quantity, photo }) => {
    //
    const { navigate } = useNavigation();
    const [orderStatus, setOrderStatus] = useState(1);
    //
    const getStatusType = (status) => {
        switch (status) {
            case 1:
                setOrderStatus("Custumer request for the products")
                break;
            case 2:
                setOrderStatus("Seller accepted the products")
                break;
            case 3:
                setOrderStatus("Agent allocated to the delivery")
                break;
            case 4:
                setOrderStatus("Agent collected the product from the seller")
                break;
            case -2:
                setOrderStatus("Seller rejected the products")
                break;
            case -1:
                setOrderStatus("All Agents rejected for deliveryr")
                break;
            default:
                setOrderStatus("Pendding")
                break;
        }
    }
    //
    useEffect(() => {
        getStatusType(status);
    }, [])
    //
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.img}
                    resizeMode='contain'
                    source={{ uri: `https://sweyn.co.uk/storage/images/products/${photo}` }}
                />
            </View>
            {/* Content Container ------------------------------------------------- */}
            <View style={styles.contentContainer}>
                {/* Section One --------------------------------------------------- */}
                <View style={styles.sectionOne}>
                    <Text style={styles.proName}>
                        {sliceText(name, 20)}
                    </Text>
                </View>
                {/* Section Two --------------------------------------------------- */}
                <View style={styles.sectionTwo}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
                        <Text style={styles.itemInfo}>
                            status: {orderStatus}
                        </Text>
                    </View>
                </View>
                {/* Section Three --------------------------------------------------- */}
                <View style={styles.sectionThree}>
                    <Text style={styles.price}>
                        ${price}
                    </Text>
                    <View style={styles.statusCard}>
                        <Text style={{ fontSize: 12, fontWeight: '500' }}>
                            In Delivery
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProductStatusCard;

const styles = StyleSheet.create({
    container: {
        padding: '3%',
        borderRadius: 7,
        borderWidth: 0.5,
        marginBottom: '5%',
        flexDirection: 'row',
        borderColor: COLORS.gray_color,
        backgroundColor: COLORS.bg_primary
    },
    imageContainer: {
        borderRadius: 5,
        width: width / 3.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg_tertiary
    },
    img: {
        width: '100%',
        height: 100
    },
    // Contents ---------------------------------------------
    contentContainer: {
        flex: 1,
        marginLeft: '2%',
        justifyContent: "space-between",
    },
    // Section One --------------->
    sectionOne: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    proName: {
        flex: 1,
        fontSize: 20,
        fontWeight: '400',
        letterSpacing: 0.5
    },
    cartRemoveCon: {
        borderRadius: 4,
        borderWidth: 0.7,
        padding: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#f7847f'
    },
    // Section Two --------------->
    sectionTwo: {
        marginTop: '2%',
    },
    itemInfo: {
        fontSize: 12,
        fontWeight: '300',
        letterSpacing: 1,
    },
    // Section Three --------------->
    sectionThree: {
        marginTop: '2%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    price: {
        fontSize: 18,
        fontWeight: '500'
    },
    statusCard: {
        borderRadius: 40,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
        backgroundColor: COLORS.bg_tertiary
    },
    trackOrder: {
        borderRadius: 40,
        paddingVertical: '2%',
        paddingHorizontal: '4%',
        backgroundColor: COLORS.primary_color
    }

})

