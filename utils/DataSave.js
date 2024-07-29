import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveItem = async (key, value) => {
    try {
        // await AsyncStorage.setItem(key, value);
        const valueToJson = JSON.stringify(value);

        await AsyncStorage.setItem(key, valueToJson);

        console.log("Save successed!")
    } catch (e) {
        throw e;
    }
}

export const getItem = async (key) => {
    try {
        // const item = await AsyncStorage.getItem(key);
        const jsonToValue = await AsyncStorage.getItem(key);

        console.log("Get Item Succeessd!")
        return jsonToValue != null ? JSON.parse(jsonToValue) : null;
    } catch (e) {
        throw(e);
    }
}