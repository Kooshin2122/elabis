//
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Devider } from '../../../../components';
import { useAppContext } from '../../../../context';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { removeData } from '../../../../utils/localStorage/AsyncStorage';
import { formDataGenerator } from '../../../../utils';
import { fetchPostAuthData } from '../../../../API';
//
const LoginModal = ({ modalVisible, changeModalVisible = () => { } }) => {
    //
    const { isUserLogin, setIsUserLogin, setUserData } = useAppContext();
    //
    const onLogout = async () => {
        // log out user
        try {
            const payload = { fcm: null };
            const formData = formDataGenerator(payload);
            fetchPostAuthData('buyer/user/updateFCM', formData)
                .then(res => console.log("Token------------>", res));
        } catch (error) {
            console.log("Error happen when updating FCM Token in LogOut Modal");
        }
        await removeData("userInfo");
        await removeData("notifications");
        await removeData("DefaultAddress");
        await removeData("wishListProducts");
        await setIsUserLogin(false);
        await setUserData(null);
        // -------- Code here --------------
        changeModalVisible(false)
    }
    //
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ padding: '5%', alignItems: 'center' }}>
                        <Octicons name="stop" size={52} color="red" />
                        <Devider height={7} />
                        {/* Content Container */}
                        <View style={styles.contentCon}>
                            <Text style={styles.title}>
                                Log out
                            </Text>
                            <Text style={styles.subTitle}>
                                Are you sure you want to log-out ? This action will clear your cart and wishlist !
                            </Text>
                        </View>
                    </View>
                    {/* Controls Container */}
                    <View style={styles.controlsCon}>
                        <Pressable onPress={() => changeModalVisible(!modalVisible)} style={[styles.button, styles.cancelBtn]}>
                            <Text style={styles.buttonTxt}>
                                Cancel
                            </Text>
                        </Pressable>
                        <Pressable onPress={onLogout} style={styles.button}>
                            <Text style={[styles.buttonTxt, { color: '#f63f34' }]}>
                                Logout
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default LoginModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
        width: '87%',
        borderRadius: 7,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    contentCon: {
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: '400',
        marginBottom: '2%',
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '300',
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
    }
})
