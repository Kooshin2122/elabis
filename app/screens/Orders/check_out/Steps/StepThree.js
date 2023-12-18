//
import React, { useState } from 'react';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
import image from '../../../../../assets/images/step3.png';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Devider } from '../../../../components';
import { PamentCards } from '../components';
import { paymentServiceCompanies } from '../../_main/services';
import { useSelector } from 'react-redux';

const StepThree = ({ changeCurrentPosition = () => { } }) => {
    const { paymentInfo } = useSelector(state => state.ordersSlice)
    const [selectPayment, setSelectPayment] = useState(paymentInfo.serviceName)
    return (
        <View style={styles.container}>
            <View style={styles.descriptionContainer} >
                <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        resizeMode="cover"
                        style={{ width: '100%', height: '100%' }}
                    />
                </View>
                <Text style={styles.desc}>
                    You can pay the money one of our accepted payment methods bellow here
                </Text>
            </View>
            <Devider />
            {/* <Text style={styles.hintText}>
                Please choose one of these payment methods
            </Text> */}
            <Devider />
            {
                paymentServiceCompanies.map((item) => <PamentCards key={item.id} {...item} changeSelectPayment={setSelectPayment} changeCurrentPosition={changeCurrentPosition} expand={selectPayment == item.serviceName ? true : false} />)
            }
            <Devider />
            <Devider />
            <Devider />
        </View>
    )
}

export default StepThree;

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
        height: 179,
    },
    desc: {
        fontSize: 15,
        color: 'gray',
        fontWeight: '300',
        letterSpacing: 0.7,
        textAlign: 'center',
    },
    // hintText: {
    //     padding: '3%',
    //     borderWidth: 0.7,
    //     borderColor: COLORS.gray_color,
    // }
})
