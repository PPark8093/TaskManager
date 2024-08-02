import AsyncStorage from "@react-native-async-storage/async-storage";

export const boolSaveItem = async (key, value) => {
    try {
        // await AsyncStorage.setItem(key, value);
        const valueToJson = JSON.stringify(value);

        await AsyncStorage.setItem(key, valueToJson);

        console.log("Save successed!")
    } catch (e) {
        throw e;
    }
}

export const boolGetItem = async (key) => {
    try {
        // const item = await AsyncStorage.getItem(key);
        const jsonToValue = await AsyncStorage.getItem(key);

        if (jsonToValue !== null) {
            return JSON.parse(jsonToValue);
        }
        return null;
    } catch (e) {
        throw(e);
    }
}