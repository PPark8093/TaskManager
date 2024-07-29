import React from "react";
import { Appearance, Linking, StatusBar, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function StartScreen({ navigation }) {

    let isDarkMode = Appearance.getColorScheme() === 'dark';

    return (
        <View style={{flex: 1, backgroundColor: isDarkMode? "#010101" : "#FFFFFF"}}>
            <StatusBar backgroundColor={isDarkMode? "#010101" : "#FFFFFF"} />
            <View style={{flex: 2, alignItems: "center", justifyContent: "flex-end"}}>
                <Text style={{fontSize: 50, color: isDarkMode? "#FFFFFF": "#010101"}}>Task Manager!</Text>
            </View>
            <View style={{flex: 8, alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity onPress={() => {navigation.navigate("TaskScreen")}} style={{backgroundColor: "#303030", width: 270, paddingVertical: 20, borderRadius: 20, alignItems: "center"}}>
                    <Text style={{color: isDarkMode? "#FFFFFF": "#010101", fontSize: 18}}>작업 목록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: "#303030", width: 270, paddingVertical: 20, borderRadius: 20, alignItems: "center", marginTop: 30}} onPress={() => {navigation.navigate("SettingScreen")}}>
                    <Text style={{color: isDarkMode? "#FFFFFF": "#010101", fontSize: 18}}>설정</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: "#303030", width: 270, paddingVertical: 20, borderRadius: 20, alignItems: "center", marginTop: 30}} onPress={() => {Linking.openURL("https://github.com/PPark8093")}}>
                    <Text style={{color: isDarkMode? "#FFFFFF": "#010101", fontSize: 18}}>크레딧</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default StartScreen;