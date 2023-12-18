import React from 'react'
import Devider from '../Devider';
import { useNavigation } from '@react-navigation/core';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, LAY_OUT } from '../../Theme/GLOBAL_STYLES';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Container = ({ title = "Container", seeMore = false, children, style = {}, titleStyle = {}, onPressSeeMore = () => { } }) => {
    const { navigate } = useNavigation();
    return (
        <View style={styles.container}>
            <View style={LAY_OUT.flex_row}>
                <Text style={[styles.Title, titleStyle]}>
                    {title}
                </Text>
                {
                    seeMore &&
                    <Pressable onPress={onPressSeeMore}>
                        <Text style={styles.seeMoreTxt}>
                            see more
                        </Text>
                    </Pressable>
                }
            </View>
            <Devider height={10} />
            <View style={{ ...style }}>
                {children}
            </View>
        </View>
    )
}

export default Container;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 0.3
    },
    Title: {
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    seeMoreTxt: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: COLORS.primary_color
    }
})
