//
import React, { useCallback, useEffect, useState } from 'react';
import { COLORS } from '../../../Theme/GLOBAL_STYLES';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import StepIndicator from 'react-native-step-indicator';
import { useFocusEffect } from '@react-navigation/core';
import { Devider, ModalContainer, SubHeader } from '../../../components';
import { Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
// Steps --------------------------->
import { StepOne, StepTwo, StepThree, StepFour } from './Steps';
import { PaymentLoadingModal, PaymentResponseModal } from './components';
// ---------------------------------->
const labels = ["Personal Information", "Delivery Address", "Payment Method", "Order Confirmation"];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: COLORS.primary_color,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: COLORS.primary_color,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: COLORS.primary_color,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: COLORS.primary_color,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: COLORS.primary_color,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelSize: 13,
    labelColor: '#999999',
    currentStepLabelColor: COLORS.primary_color
}
// ------------------------------------>
const CheckOutScreen = ({ route }) => {
    const { getParent } = useNavigation();
    const cartTotal = route?.params?.cartTotal;
    const [currentPosition, setCurrentPosition] = useState(0);
    const { paymentLoadingModal, paymentSuccessfullModal, paymentErrorModal } = useSelector(state => state.ordersSlice);
    //
    const onPageChange = (position) => {
        if (position > currentPosition)
            return
        // else
        setCurrentPosition(position)
    };
    //
    useFocusEffect(
        useCallback(() => {
            // I am using these fuctions to refresh step two and it's important
        }, [])
    );
    //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Check-out" />
            <KeyboardAvoidingView
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
                enabled
            >
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Devider />
                    <StepIndicator
                        stepCount={4}
                        labels={labels}
                        onPress={onPageChange}
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                    />
                    {/* Steps Container */}
                    {currentPosition == 0 && <StepOne changeCurrentPosition={setCurrentPosition} />}
                    {currentPosition == 1 && <StepTwo changeCurrentPosition={setCurrentPosition} />}
                    {currentPosition == 2 && <StepThree changeCurrentPosition={setCurrentPosition} />}
                    {currentPosition == 3 && <StepFour cartTotal={cartTotal} changeCurrentPosition={setCurrentPosition} />}
                    <Devider />
                </ScrollView>
            </KeyboardAvoidingView>
            {
                paymentLoadingModal &&
                <PaymentLoadingModal />
                // <ModalContainer>
                // </ModalContainer>
            }
            {
                paymentSuccessfullModal &&
                <ModalContainer>
                    <PaymentResponseModal iconName='check-circle' title="Completed successfully" discription='Thank you for completed order payment, delivery team ships your order.' />
                </ModalContainer>
            }
            {
                paymentErrorModal &&
                <ModalContainer>
                    <PaymentResponseModal iconName='stop' title="oops!" discription='Sorry completing payment process is canceled. please try again ' />
                </ModalContainer>
            }
        </SafeAreaView>
    )
}

export default CheckOutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    }
})
