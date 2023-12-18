//
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS, LAY_OUT } from '../../../../Theme/GLOBAL_STYLES';
//
const NaficationCards = ({ data }) => {
    return (
        <View style={styles.container}>
            {/* icon container */}
            <View style={styles.iconContainer}>
                <Feather name="bell" size={22} />
            </View>
            <View style={styles.contentCon}>
                <Text style={styles.content}>
                    <Text style={styles.title}>
                        {data?.notification?.title + ' '}
                    </Text>
                    {data?.notification?.body}
                </Text>
                <Text style={styles.date}>
                    {data?.sentTime}
                </Text>
            </View>
        </View>
    )
}
//
export default NaficationCards;
//
const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: '3%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 7,
        marginBottom: '5%',
        backgroundColor: COLORS.bg_primary,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B9C2F0',
    },
    contentCon: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        fontSize: 13,
        fontWeight: '300',
    },
    title: {
        fontSize: 15,
        marginRight: 5,
        fontWeight: '500'
    },
    date: {
        marginTop: 7,
        fontSize: 13,
        fontWeight: '300'
    }
})
//