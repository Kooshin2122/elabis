//
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import * as Location from 'expo-location';
import { formDataGenerator } from '../../../utils';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { fetchGetData, fetchPostAuthData } from '../../../API';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { Picker } from 'react-native-ui-lib/src/components/picker';
import { CustomButton, Devider, LoadingIndicator, LoadingModal, PaperTextInput, SubHeader } from '../../../components';
import { FlatList, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../../../context';
//
const formValidation = Yup.object().shape({
    title: Yup.string().required('Required'),
    landmark: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    region: Yup.string().required('Required'),
});
//
const AddressFormScreen = ({ route }) => {
    const [states, setStates] = useState([]);
    const [regions, setRegions] = useState([]);
    const { navigate, goBack } = useNavigation();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const addressInformation = route?.params;
    const { userLocation, setUserLocation } = useAppContext();
    const { status, UAID, id, title, landmark, state, region, additional_information } = addressInformation?.params?.addressInformation ?? "";
    const [statesPlaceholder, setStatesPlaceholder] = useState(state?.name ?? "Select Your State");
    const [regionsPlaceholder, setRegionsPlaceholder] = useState(region?.name ?? "Select Your Region");
    //
    const [addressInfo, setAddressInfo] = useState({
        title: title, state: state?.id, region: state?.id, landmark: landmark, additional_information: additional_information
    });
    //
    const getStatesAsync = async () => {
        const res = await fetchGetData("global/states/", setLoading);
        setStates(res.data);
    }
    const getRegionsAsync = async () => {
        const res = await fetchGetData("global/regions/");
        setRegions(res.data);
    }
    //
    const getPermisionAsync = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            Location.getCurrentPositionAsync().then(location => {
                console.log("Location-------->", location);
                setUserLocation(location)
            }).catch((error) => console.log("error--", error))
        } catch (error) {
            console.log("error happen when getting permision in the expo");
        }
    }
    //
    const saveAddress = async (values) => {
        try {
            setLoading(true);
            if (userLocation?.coords?.latitude == null) {
                await getPermisionAsync();
                setLoading(false);
                alert("Please turn-on your location to save your new address")
                return
            }
            const address = {
                ...values,
                latitude: userLocation?.coords?.latitude,
                longitude: userLocation?.coords?.longitude,
            }
            console.log("address------>", address);
            const formData = await formDataGenerator(address);
            const res = await fetchPostAuthData("buyer/address/add", formData);
            console.log("address------>", res);
            setLoading(false);
            if (res?.status == "success") {
                navigate("AddressesScreen")
                return
            }
        } catch (error) {
            alert(error)
        }
    }
    //
    const updateAddress = async (values) => {
        try {
            if (userLocation?.coords?.latitude == null) {
                await getPermisionAsync();
                return
            }
            const address = {
                UAID: UAID,
                ...values,
                latitude: userLocation?.coords.latitude,
                longitude: userLocation?.coords.longitude,
            }
            const formData = await formDataGenerator(address);
            setLoading(true);
            const res = await fetchPostAuthData("buyer/address/update", formData);
            console.log("------------", res);
            setLoading(false);
            if (res.status == "success") {
                alert("hello")
                navigate("AddressesScreen")
                return
            }
        } catch (error) {
            alert(error)
        }
    }
    // //
    return (
        <SafeAreaView style={styles.container}>
            <SubHeader title="Add New Address" backTo="CheckOut" />
            <KeyboardAvoidingView
                enabled
                style={{ flex: 1, }}
                keyboardVerticalOffset={15}
                behavior={Platform.OS == 'ios' ? 'padding' : null}
            >
                <ScrollView stickyHeaderIndices={[0]} style={styles.scrollCon} showsVerticalScrollIndicator={false}>
                    <View>
                        <Pressable onPress={() => goBack()} style={styles.backBtnIconCon}>
                            <AntDesign name="left" size={23} color="#ffffff" />
                        </Pressable>
                    </View>
                    <Formik
                        initialValues={addressInfo}
                        validationSchema={formValidation}
                        onSubmit={UAID ? updateAddress : saveAddress}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched }) => {
                            return (
                                <View style={styles.formContainer}>
                                    <View style={styles.line} />
                                    <Devider />
                                    <Text style={styles.title}>
                                        Add New Address
                                     </Text>
                                    <Devider />
                                    <PaperTextInput
                                        value={values.title}
                                        placeholder="Place Name Ex(Home,Office,Others)"
                                        onChangeText={handleChange("title")}
                                        error={errors.title && touched.title ? true : false}
                                        label={errors.title && touched.title ? "Required" : `Place Name`}
                                    />
                                    <PaperTextInput
                                        placeholder="Near By Ex(Some where)"
                                        value={values.landmark}
                                        onChangeText={handleChange("landmark")}
                                        error={errors.landmark && touched.landmark ? true : false}
                                        label={errors.landmark && touched.landmark ? "Required" : `Near By`}
                                    />
                                    {/* Picker */}
                                    <Picker
                                        useSafeArea
                                        fieldType="form"
                                        onPress={getStatesAsync}
                                        placeholderTextColor="#000"
                                        placeholder={statesPlaceholder}
                                        fieldStyle={[styles.statePickerCon, { borderColor: errors.title && touched.title ? "red" : COLORS.black_color }]}
                                    // onChange={(value) => }
                                    >
                                        <FlatList
                                            data={states}
                                            renderItem={({ item }) => (
                                                <Picker.Item
                                                    key={item.id}
                                                    label={item.name}
                                                    onPress={() => {
                                                        setFieldValue("state", item.id)
                                                        setStatesPlaceholder(item.name)
                                                        setFieldTouched(state, true, false)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Picker>
                                    <Picker
                                        useSafeArea
                                        fieldType="form"
                                        onPress={getRegionsAsync}
                                        placeholderTextColor="#000"
                                        placeholder={regionsPlaceholder}
                                        fieldStyle={styles.regionPickerCon}
                                        onChange={(value) => console.log('value', value)}
                                    >
                                        <FlatList
                                            data={regions}
                                            renderItem={({ item }) => (
                                                <Picker.Item
                                                    key={item.id}
                                                    label={item.name}
                                                    onPress={() => {
                                                        setFieldValue("region", item.id);
                                                        setRegionsPlaceholder(item.name)
                                                    }}
                                                />
                                            )}
                                        />
                                    </Picker>
                                    <PaperTextInput
                                        multiline
                                        numberOfLines={5}
                                        label="Additional Info"
                                        placeholder="Additional Information"
                                        value={values.additional_information}
                                        onChangeText={handleChange("additional_information")}
                                    />
                                    <CustomButton
                                        isLoading={loading}
                                        clickHandler={handleSubmit}
                                        title={UAID ? "Update" : "Save"}
                                    />
                                    <Devider />
                                </View>
                            )
                        }}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
//
export default AddressFormScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    scrollCon: {
        flex: 1,
    },
    backBtnIconCon: {
        top: 50,
        left: "6%",
        zIndex: 1000,
        position: "absolute",
        alignItems: "center",
        borderRadius: 6,
        padding: "2%",
        paddingLeft: "1%",
        paddingRight: "3%",
        justifyContent: "center",
        backgroundColor: "rgba(33, 32, 32, 0.45)",
    },
    map: {
        height: 550,
        width: "100%",
        borderRadius: 7
    },
    formContainer: {
        flex: 1,
        zIndex: 100,
        padding: '3%',
        borderRadius: 15,
        backgroundColor: COLORS.bg_primary
    },
    line: {
        height: 5,
        width: 70,
        borderRadius: 50,
        alignSelf: "center",
        backgroundColor: COLORS.primary_color
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.8,
    },
    statePickerCon: {
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        borderColor: COLORS.black_color,
    },
    regionPickerCon: {
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: -7,
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        borderColor: COLORS.black_color,
    }
});
//

// {/* {loading && <LoadingModal />} */}
