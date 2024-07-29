import React, { useState } from "react";
import { Alert, Appearance, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

function SettingScreen({ navigation }) {

    // const [fontSize, setFontSize] = useState("Normal");

    const onSwipe = (event) => {
        const { translationX } = event.nativeEvent;
        if (translationX > 50) {
            navigation.navigate("StartScreen")
        }
    };

    let isDarkMode = Appearance.getColorScheme() === 'dark';

    return(
        <PanGestureHandler onGestureEvent={onSwipe}>
            <View style={{flex: 1, backgroundColor: isDarkMode ? "#010101" : "#FFFFFF" }}>
                <StatusBar backgroundColor={isDarkMode? "#010101" : "#FFFFFF"} />
                    
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 40, fontWeight: "100", color: isDarkMode ? "#FFFFFF" : "#010101" }}>설정</Text>
                </View>

                <View style={{ flex: 6, alignItems: "center" }}>
                    <TouchableOpacity style={{backgroundColor: "#303030", width: 270, paddingVertical: 20, borderRadius: 20, alignItems: "center", marginTop: 30}} onPress={() => {Alert.alert("???", "아직 개발중!")}}>
                        <Text style={{color: isDarkMode? "#FFFFFF": "#010101", fontSize: 18}}>???</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 23, color: isDarkMode? "#FFFFFF" : "#010101", textAlign: "center", flex: 9, marginBottom: 20, textAlignVertical: "bottom"}}>Version: 1.0.0</Text>
                </View>
            </View>
        </PanGestureHandler>
    )
}

export default SettingScreen;