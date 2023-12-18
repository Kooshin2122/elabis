//
import * as yup from 'yup';
import AddressView from '../components/AddressView';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import image from '../../../../../assets/images/step2.png';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import { readData } from '../../../../utils/localStorage/AsyncStorage';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { changeDeliveryAddress } from '../../../../ReduxStore/OrdersSlice';
import { CustomButton, CustomInput, Devider, LoadingModal } from '../../../../components';
//
const StepTwo = ({ changeCurrentPosition = () => { } }) => {
    //
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [deliveyAdd, setdeliveyAdd] = useState(null);
    const { deliveryAddress } = useSelector((state) => state.ordersSlice)
    // 
    const readAddressFromMobileStorage = async () => {
        setLoading(true);
        const res = await readData("DefaultAddress");
        setdeliveyAdd(res);
        setLoading(false);
        console.log("res-----", res);
    };
    useFocusEffect(useCallback(() => {
        readAddressFromMobileStorage();
    }, []));
    //
    const onNext = () => {
        changeCurrentPosition(2)
        dispatch(changeDeliveryAddress(deliveyAdd))
    }
    //
    const navigateAddressScreen = () => {
        navigate("AddressesScreen");
    }
    // ---------------------------------------->
    return (
        <View style={styles.container}>
            {loading && <LoadingModal />}
            <View style={styles.descriptionContainer} >
                <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
            </View>
            {
                deliveyAdd ?
                    <View>
                        <Text style={styles.desc}>
                            This is your address that the delivery guy will pick up you order to your location. keep it correct information.
                        </Text>
                        <Devider />
                        <AddressView {...deliveyAdd} selectAddress={deliveyAdd.id} />
                        <Devider />
                        <Pressable onPress={onNext} style={styles.nextBtnCon}>
                            <Text style={styles.nextBtnTxt}>Next</Text>
                        </Pressable>
                    </View>
                    :
                    <View style={styles.emptyAddressCard}>
                        <Devider />
                        <Text style={styles.desc}>
                            Please provide your address that the delivery guy will pick up you order to your location. keep it correct information.
                         </Text>
                        <Devider />
                        <Pressable onPress={navigateAddressScreen} style={styles.nextBtnCon}>
                            <Text style={styles.nextBtnTxt}>Add New Address</Text>
                        </Pressable>
                        <Devider />
                    </View>
            }
        </View>
    )
}

export default StepTwo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: LAY_OUT.padding
    },
    descriptionContainer: {
        paddingBottom: '2%',
        alignItems: 'center',
    },
    imageContainer: {
        width: '90%',
        height: 150,
    },
    desc: {
        fontSize: 15,
        color: 'gray',
        fontWeight: '300',
        letterSpacing: 0.7,
        textAlign: 'center',
    },
    formContainer: {
        paddingHorizontal: '2%',
        paddingBottom: '10%'
    },
    nextBtnCon: {
        borderRadius: 40,
        paddingVertical: '3%',
        backgroundColor: COLORS.primary_color
    },
    nextBtnTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        letterSpacing: 0.8,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    addressCard: {
        padding: "3%",
        borderWidth: 0.9,
        borderColor: COLORS.gray_color
    },
    emptyAddressCard: {
        padding: "4%",
        borderRadius: 7,
        borderWidth: 0.9,
        borderColor: COLORS.gray_color
    }
})

