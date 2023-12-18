//
import AsyncStorage from '@react-native-async-storage/async-storage';
//
const prefixKey = "@MAKAANIK_CUSTOMER_APP";
//
export const storeData = async (key, value) => {
    const jsonValue = JSON.stringify(value);
    try {
        await AsyncStorage.setItem(prefixKey + key, jsonValue)
        console.log('succesfully to store');
    } catch (e) {
        console.error('error happened when storing data', e)
    }
};
//
export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(prefixKey + key)
    } catch (e) {
        console.error(e)
    }
};
//
export const readData = async (key) => {
    try {
        let jsonValue = await AsyncStorage.getItem(prefixKey + key)
        return JSON.parse(jsonValue)
    } catch (e) {
        console.error(e)
    }

};
//