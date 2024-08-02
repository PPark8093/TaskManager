import React, { useState } from "react";
import { Appearance, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export const InputDialog = ({ visible, onClose, onSubmit }) => {

    const [input, setInput] = useState("");

    let isDarkMode = Appearance.getColorScheme() === 'dark';

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
            <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                <View style={{backgroundColor: "#202020", height: 200, width: 350, borderRadius: 25}}>
                    <View style={{flex: 2, marginTop: 10, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: 20, color: isDarkMode? "#CCCCCC" : "#010101", textAlign: "center", flex: 4}}>Input Dialog</Text>
                    </View>
                    <View style={{flex: 3, justifyContent: "center"}}>
                        <TextInput 
                        style={{ fontSize: 23, backgroundColor: "#303030", paddingVertical: 0, paddingHorizontal: 10, borderRadius: 15, marginHorizontal: 20, alignItems: "center", justifyContent: "center", flex: 1}}
                        placeholder="Input Something"
                        value={input}
                        onChangeText={setInput}
                        />
                    </View>
                    <View style={{flex: 2, alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                        <TouchableOpacity style={{alignItems: "center", justifyContent: "center", flex: 1, marginLeft: 5}} onPress={() => {setInput(""); onClose()}}>
                            <Text style={{fontSize: 20, color: isDarkMode? "#FFFFFF" : "#010101", textAlign: "center", justifyContent: "center", marginBottom: 3}}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginRight: 5, alignItems: "center", justifyContent: "center", flex: 1}} onPress={() => {onSubmit(input); setInput(""); onClose()}}>
                            <Text style={{fontSize: 20, color: isDarkMode? "#FFFFFF" : "#010101", textAlign: "center", justifyContent: "center", marginBottom: 3}}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    
        </Modal>
    );
}

export default InputDialog;