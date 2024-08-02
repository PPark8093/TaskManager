import React, { useCallback, useEffect, useState } from "react";
import { Alert, Appearance, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import arrow_back_filled from "../assets/arrow_back_filled.png"
import { getItem, saveItem } from "../utils/DataSave";
import DialogInput from "react-native-dialog/lib/Input";
import InputDialog from "../Components/InputDialog";

function SettingScreen({ navigation }) {

    const [password, setPassword] = useState("DEBUG_PASSWORD")
    const [dialogVisible, setDialogVisible] = useState(false);

    

    const onSwipe = (event) => {
        const { translationX } = event.nativeEvent;
        if (translationX > 50) {
            navigation.navigate("StartScreen")
        }
    };

    const passwordCheck = (value) => {
        if (value === password) {
            navigation.navigate("DebugScreen");
        } else {
            Alert.alert("DEBUG", "Password Incorrect!")
        }
    }

    let isDarkMode = Appearance.getColorScheme() === 'dark';

    return(
        <PanGestureHandler onGestureEvent={onSwipe}>
            <View style={{flex: 1, backgroundColor: isDarkMode ? "#010101" : "#FFFFFF" }}>
                <StatusBar backgroundColor={isDarkMode? "#010101" : "#FFFFFF"} />
                
                <TouchableOpacity style={{flexDirection: "row", marginTop: 7, marginLeft: 5}} onPress={() => {navigation.navigate("StartScreen")}}>
                    <Image source={arrow_back_filled} style={{width: 19, height: 19, marginTop: 0, tintColor: "#AAAAAA"}} />
                    <Text style={{color: "#AAAAAA", fontSize: 16}}>시작</Text>
                </TouchableOpacity>
                <InputDialog visible={dialogVisible} onClose={() => {setDialogVisible(false)}} onSubmit={passwordCheck}/>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 40, fontWeight: "100", color: isDarkMode ? "#FFFFFF" : "#010101" }}>설정</Text>
                </View>

                <View style={{ flex: 6, alignItems: "center" }}>
                    <TouchableOpacity style={{backgroundColor: "#303030", width: 270, paddingVertical: 20, borderRadius: 20, alignItems: "center", marginTop: 30}} onPress={() => {Alert.alert("???", "아직 개발중!");}}>
                        <Text style={{color: isDarkMode? "#FFFFFF": "#010101", fontSize: 18}}>???</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style={{backgroundColor: "#303030", width: 270, paddingVertical: 20, borderRadius: 20, alignItems: "center", marginTop: 30}} onPress={() => {setDialogVisible(true)}}>
                        <Text style={{color: isDarkMode? "#FFFFFF": "#010101", fontSize: 18}}>Debug Menu</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 23, color: isDarkMode? "#FFFFFF" : "#010101", textAlign: "center", flex: 9, marginBottom: 20, textAlignVertical: "bottom"}}>Version: 1.2.1</Text>
                </View>
            </View>
        </PanGestureHandler>
    )
}

export default SettingScreen;