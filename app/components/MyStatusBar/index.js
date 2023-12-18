import React from 'react'
import { StatusBar } from 'react-native';

const MyStatusBar = ({ barColor = "dark-content", bg = 'transparent', }) => {
    return (
        <StatusBar backgroundColor={bg} barStyle={barColor} />
    )
}

export default MyStatusBar;

