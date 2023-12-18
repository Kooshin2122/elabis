//
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Devider } from '../../../../components';
import { useAppContext } from '../../../../context';
import { COLORS } from '../../../../Theme/GLOBAL_STYLES';
import { readData, removeData } from '../../../../utils/localStorage/AsyncStorage';
import { formDataGenerator } from '../../../../utils';
import { fetchGetAuthData, fetchPostAuthData } from '../../../../API';
//
const RemoveAccountModal = ({ modalVisible, changeModalVisible = () => { } }) => {
    //
    const { isUserLogin, setIsUserLogin, setUserData } = useAppContext();
    //
    const onRemoveAccount = async () => {
        // log out user
        try {
            const isUserLogin = await readData("userInfo");
            const { token_type, access_token } = isUserLogin;
            //
            const res = await fetch(`https://api.elabis.app/v1/buyer/user/delete`, {
                method: "GET",
                headers: {
                    Authorization: `${token_type}${access_token}`
                },
            });
            const message = await res.json();
            console.log("message...........--------------", message);
            //
        } catch (error) {
            console.log("Error happen when removing account", error);
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
                                Remove Account
                            </Text>
                            <Text style={styles.subTitle}>
                                Are you sure you want to remove account ? This action will clear your cart and wishlist !
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
                        <Pressable onPress={onRemoveAccount} style={styles.button}>
                            <Text style={[styles.buttonTxt, { color: '#f63f34' }]}>
                                Remove
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default RemoveAccountModal

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
