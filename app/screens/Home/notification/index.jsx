//
import React, { useEffect, useState } from 'react';
// import { notifigations } from './services';
import { NaficationCards } from './components';
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, LAY_OUT } from '../../../Theme/GLOBAL_STYLES';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { readData } from '../../../utils/localStorage/AsyncStorage';
import ListEmptyComponent from '../../../components/ListEmptyComponent';
//
const NotificationsScreen = () => {
    //
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);
    //
    const getNotificationsAsync = async () => {
        const result = await readData("notifications");
        setNotifications(result);
    };
    //
    useEffect(() => {
        getNotificationsAsync();
    }, [])
    //
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Notifigations
                </Text>
                <Ionicons onPress={() => navigation.goBack()} name="md-close" size={27} />
            </View>
            {/* Nafication Cards Container */}
            <ScrollView style={styles.scrollCon}>
                <View>
                    <Text style={styles.sectionTitle}>
                        All Notivigations
                    </Text>
                    <FlatList
                        data={notifications}
                        scrollEnabled={false}
                        ListEmptyComponent={() => <ListEmptyComponent />}
                        renderItem={({ item }) => <NaficationCards data={item} />}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
//
export default NotificationsScreen;
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg_primary
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: LAY_OUT.padding,
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 1
    },
    scrollCon: {
        flex: 1,
        padding: LAY_OUT.padding,
        backgroundColor: '#f8f9fa'
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.6,
        marginBottom: 15
    }
})
//