//
import React, { useEffect } from 'react';
import { Devider } from '../../../../components';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import Octicons from 'react-native-vector-icons/Octicons';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { showPaymentErrorModal, showPaymentLoadingModal, showPaymentSuccessfullModal } from '../../../../ReduxStore/OrdersSlice';

const PaymentResponseModal = ({ status = false, message = "", iconName, title, discription, isVisible, changeModalVisible = () => { } }) => {
    const { navigate } = useNavigation();
    //
    const onCloseModal = () => {
        changeModalVisible(false);
    }
    //
    return (
        <View style={styles.container}>
            <Pressable style={styles.centeredView}>
                <View style={styles.modalView}>
                    {
                        status ?
                            <Octicons name="check-circle" size={50} color={COLORS.primary_color} />
                            :
                            <Octicons name="stop" size={50} color={'red'} />
                    }
                    <Devider height={7} />
                    {/* Content Container */}
                    <View style={styles.contentCon}>
                        <Text style={styles.title}>
                            {
                                status ?
                                    "Payment Completed"
                                    :
                                    "Payment Failed"
                            }
                        </Text>
                        <Text style={styles.subTitle}>
                            {message}
                        </Text>
                    </View>
                    <Devider />
                    {/* controls */}
                    {
                        status ?
                            <View style={styles.controlsCon}>
                                <Pressable onPress={onCloseModal} style={styles.cancelBtn}>
                                    <Text style={styles.buttonTxt}>Close</Text>
                                </Pressable>
                                <Pressable onPress={() => navigate("Orders", { screen: "On-Process", initial: false })} style={styles.ViewOrderBtn}>
                                    <Text style={styles.buttonTxt}>View Order</Text>
                                </Pressable>
                            </View>
                            :
                            <Pressable onPress={onCloseModal} style={styles.tryAgainBtn}>
                                <Text style={styles.buttonTxt}>Try Again</Text>
                            </Pressable>
                    }
                </View>
            </Pressable>
        </View>
        // </Modal>
    )
}

export default PaymentResponseModal;

const styles = StyleSheet.create({
    container: {
        top: 0,
        height: "100%",
        width: "100%",
        zIndex: 1000,
        position: "absolute",
    },
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
        paddingBottom: '1%',
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
    controlsCon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ViewOrderBtn: {
        width: '50%',
        padding: '4%',
        borderTopWidth: 0.7,
        alignItems: "center",
        borderColor: COLORS.gray_color
    },
    cancelBtn: {
        width: '50%',
        padding: '4%',
        borderTopWidth: 0.7,
        borderRightWidth: 0.7,
        alignItems: "center",
        borderColor: COLORS.gray_color
    },
    buttonTxt: {
        fontSize: 13,
        color: '#137cf3',
        fontWeight: "600",
        letterSpacing: 0.7,
        textAlign: 'center',
        textTransform: "uppercase",
    },
    tryAgainBtn: {
        width: '100%',
        padding: '4%',
        borderTopWidth: 0.7,
        alignItems: "center",
        borderColor: COLORS.gray_color
    }
})

