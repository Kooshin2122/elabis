//
import React, { useEffect, useState } from 'react';
import { CustomButton, Devider } from '../../../../components';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import Octicons from 'react-native-vector-icons/Octicons';
import { ActivityIndicator, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { showPaymentErrorModal, showPaymentLoadingModal, showPaymentSuccessfullModal } from '../../../../ReduxStore/OrdersSlice';

const PaymentLoadingModal = ({ paymentNumber, closeModal = () => { } }) => {
    //
    const [seconds, setSeconds] = useState(30);
    const [tryAgain, setTryAgain] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {

            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            else setTryAgain(true);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    //
    return (
        <Modal
            transparent={true}
            animationType="fade"
        >
            <Pressable style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ActivityIndicator size={Platform.OS == 'ios' ? "large" : 50} />
                    <Devider height={7} />
                    {/* Content Container */}
                    <View style={styles.contentCon}>
                        <Text style={styles.title}>
                            Completing payment process
                        </Text>
                        <Text style={styles.subTitle}>
                            Please check the mobile where this sim
                            card  {""}
                            <Text style={styles.boldSubTitle}>
                                {paymentNumber}
                            </Text> {""}
                            is plugged {""}
                            <Text style={styles.boldSubTitle}>
                                {seconds}s
                            </Text>
                        </Text>
                        <Devider />
                        {
                            tryAgain &&
                            <Pressable style={styles.tryAgainBtn}>
                                <Text style={[styles.boldSubTitle, { color: "#fff" }]}>
                                    Try Again
                                </Text>
                            </Pressable>
                        }
                    </View>
                </View>
            </Pressable>
        </Modal>
    )
}

export default PaymentLoadingModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#00000097",
    },
    modalView: {
        width: '87%',
        borderRadius: 7,
        alignItems: 'center',
        paddingTop: '5%',
        paddingBottom: '7%',
        paddingHorizontal: '5%',
        backgroundColor: 'white',
    },
    contentCon: {
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        marginBottom: '2%',
    },
    subTitle: {
        fontSize: 14,
        fontWeight: '300',
        textAlign: 'center'
    },
    boldSubTitle: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center'
    },
    controlsCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        width: '50%',
        padding: '3%',
        borderTopWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    cancelBtn: {
        borderRightWidth: 0.7,
        borderColor: COLORS.gray_color
    },
    buttonTxt: {
        fontSize: 18,
        textAlign: 'center',
        color: '#137cf3'
    },
    tryAgainBtn: {
        borderRadius: 4,
        paddingVertical: "3%",
        paddingHorizontal: "10%",
        backgroundColor: COLORS.primary_color
    }
})

