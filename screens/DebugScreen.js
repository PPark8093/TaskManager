import React, { useEffect, useState } from "react";
import { Alert, Appearance, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import arrow_back_filled from "../assets/arrow_back_filled.png"
import { getItem, saveItem } from "../utils/DataSave";
import { FlatList, TextInput } from "react-native-gesture-handler";

function DebugScreen({ navigation }) {

    let isDarkMode = Appearance.getColorScheme() === 'dark';

    const [data, setData] = useState([]);
    const [feature, setFeature] = useState("");

    const saving = async () => {
        try {
            await saveItem('Adds', data);
        } catch (e) {
            console.error(e);
        }
    }

    const getting = async () => {
        try {
            const loadedArray = await getItem('Adds');
            if (loadedArray) {
                setData(loadedArray);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        getting();
    }, [])

    useEffect(() => {
        saving();
    }, [data]);

    const addTask = () => {
        if (feature.trim()) {
            const newData = [...data, feature.trim()];
            setData(newData);
            setFeature("");
        }
    }

    const removeTask = (index) => {
        setData(prevData => prevData.filter((_, i) => i !== index));
    }

    const renderItem = ({item, index}) => {

        return (
            <View style={{}}>
                <View style={{marginTop: 10, backgroundColor: "#202020", paddingVertical: 15, marginHorizontal: 20, borderRadius: 5, flexDirection: "row", alignItems: "center"}}>
                    <View style={{flex: 3, marginLeft: 10}}>
                        <Text style={{fontSize: 20, color: isDarkMode ? "#CCCCCC" : "#010101", textAlign: "center"}}>{index}</Text>
                    </View>
                    <Text style={{fontSize: 23, color: isDarkMode ? "#FFFFFF" : "#010101", textAlign: "center", flex: 10, marginBottom: 3}}>{item.toString()}</Text>
                    <TouchableOpacity style={{backgroundColor: "#303030", paddingVertical: "1%", borderRadius: 5, alignItems: "center", justifyContent: "center", flex: 3, marginRight: 10}} onPress={() => {removeTask(index)}}>
                        <Text style={{fontSize: 20, color: isDarkMode ? "#FFFFFF" : "#010101", textAlign: "center", justifyContent: "center", marginBottom: 3}}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return(
        <View style={{flex: 1, backgroundColor: isDarkMode ? "#010101" : "#FFFFFF"}}>
            <StatusBar backgroundColor={isDarkMode? "#010101" : "#FFFFFF"} />
                
            <TouchableOpacity style={{flexDirection: "row", marginTop: 7, marginLeft: 5}} onPress={() => {navigation.navigate("SettingScreen")}}>
                <Image source={arrow_back_filled} style={{width: 19, height: 19, marginTop: 0, tintColor: "#AAAAAA"}} />
                <Text style={{color: "#AAAAAA", fontSize: 16}}>설정</Text>
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{ fontSize: 40, fontWeight: "400", color: isDarkMode ? "#FFFFFF" : "#010101" }}>Debug Menu</Text>
            </View>
            <View style={{flex: 6}}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 30, fontWeight: "400", color: isDarkMode ? "#CCCCCC" : "#010101" }}>Features to add</Text>
                </View>
                <View style={{flex: 10, width: "100%"}}>
                    <FlatList style={{}} data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()}/>
                    <View style={{justifyContent: "flex-end"}}>
                    <View style={{flexDirection: "row"}}>
                        <TextInput style={{ fontSize: 23, backgroundColor: "#303030", marginHorizontal: 20, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 5, alignItems: "center", justifyContent: "center", marginTop: 10, flex: 3}} placeholder="Input new Features to add" placeholderTextColor={"#999999"} value={feature} onChangeText={setFeature} />
                    </View>
                    <TouchableOpacity style={{ marginBottom: 20, backgroundColor: "#303030", paddingVertical: 15, marginHorizontal: 20, borderRadius: 5, alignItems: "center", justifyContent: "center", marginTop: 10 }} onPress={() => {addTask()}}>
                        <Text style={{ fontSize: 23, color: isDarkMode ? "#FFFFFF" : "#010101" }}>Add new idea</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default DebugScreen;