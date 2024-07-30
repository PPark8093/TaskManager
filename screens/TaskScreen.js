import React, { useEffect, useState } from "react";
import { Appearance, Dimensions, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { getItem, saveItem } from "../utils/DataSave";
import { PanGestureHandler } from "react-native-gesture-handler";

function TaskScreen({ navigation }) {

    const onSwipe = (event) => {
        const { translationX } = event.nativeEvent;
        if (translationX > 50) {
            navigation.navigate("StartScreen")
        }
    };

    let isDarkMode = Appearance.getColorScheme() === 'dark';

    const [data, setData] = useState([]);
    const [date, setDate] = useState(new Date());
    const [todo, setTodo] = useState(''); // input

    const [opened, setOpened] = useState(false);

    const [formattedDate, setFormattedDate] = useState(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    const [formattedHour, setFormattedHour] = useState(date.getHours() + "-" + date.getMinutes());

    useEffect(() => {
        getting();
    }, [])

    useEffect(() => {
        setFormattedDate(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "\n")
        setFormattedHour(date.getHours() + "시" + date.getMinutes() + "분");
    });

    useEffect(() => {
        saving();
    }, [data]);

    const saving = async () => {
        try {
            await saveItem('Tasks', data);
            console.log("Saving LOG")
            console.log(data.toString())
        } catch (e) {
            console.error(e);
        }
    }

    const getting = async () => {
        try {
            const loadedArray = await getItem('Tasks');
            if (loadedArray) {
                loadedArray.sort((a, b) => {
                    return new Date(a.match(/\d{4}-\d{1,2}-\d{1,2}/) + " " + a.match(/\d+시\d+분/)[0].replace("시", ":").replace("분", "")) - new Date(b.match(/\d{4}-\d{1,2}-\d{1,2}/) + " " + b.match(/\d+시\d+분/)[0].replace("시", ":").replace("분", ""));
                })
                setData(loadedArray);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const addTask = () => {
        if (todo.trim()) {
            const newDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            const newTask = "[" + newDate + " | " + date.getHours() + "시" + date.getMinutes() + "분] \n" + todo.trim();
            const newData = [...data, newTask];

            newData.sort((a, b) => {
                return new Date(a.match(/\d{4}-\d{1,2}-\d{1,2}/) + " " + a.match(/\d+시\d+분/)[0].replace("시", ":").replace("분", "")) - new Date(b.match(/\d{4}-\d{1,2}-\d{1,2}/) + " " + b.match(/\d+시\d+분/)[0].replace("시", ":").replace("분", ""));
            });

            setData(newData);
            setTodo("");
        }
    }

    const removeTask = (index) => {
        setData(prevData => prevData.filter((_, i) => i !== index));
    }

    const renderItem = ({item, index}) => {
        // 날짜와 시간 정보를 추출합니다.
        const dateMatch = item.match(/\d{4}-\d{1,2}-\d{1,2}/);
        const timeMatch = item.match(/(\d+시\d+분)/);

        // 할 일 내용 부분을 추출합니다.
        const taskContent = item.split('\n')[1];

        return (
            <View style={{}}>
                <View style={{marginTop: 10, backgroundColor: "#202020", paddingHorizontal: 20, paddingVertical: 15, marginHorizontal: 20, borderRadius: 5, flexDirection: "row", alignItems: "center"}}>
                    <View style={{flex: 4}}>
                        <Text style={{fontSize: 20, color: isDarkMode ? "#CCCCCC" : "#010101", textAlign: "center"}}>{dateMatch ? dateMatch[0] : ''}</Text>
                        <Text style={{fontSize: 15, color: isDarkMode ? "#AAAAAA" : "#010101", textAlign: "center"}}>{timeMatch ? timeMatch[0] : ''}</Text>
                    </View>
                    <Text style={{fontSize: 23, color: isDarkMode ? "#FFFFFF" : "#010101", textAlign: "center", flex: 9, marginBottom: 3}}>{taskContent}</Text>
                    <TouchableOpacity style={{backgroundColor: "#303030", paddingVertical: "1%", borderRadius: 5, alignItems: "center", justifyContent: "center", flex: 3}} onPress={() => removeTask(index)}>
                        <Text style={{fontSize: 20, color: isDarkMode ? "#FFFFFF" : "#010101", textAlign: "center", justifyContent: "center", marginBottom: 3}}>제거</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
    }

    return(
        <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010101" : "#FFFFFF" }}>
            <StatusBar backgroundColor={isDarkMode? "#010101" : "#FFFFFF"} />
            
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 40, fontWeight: "100", color: isDarkMode ? "#FFFFFF" : "#010101" }}>작업 목록</Text>
            </View>
            <View style={{ flex: 6 }}>
                <View style={{flex: 9, width: "100%"}}>
                    <FlatList style={{marginTop: 15}} data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()}/>
                </View>
                <View style={{justifyContent: "flex-end"}}>
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity style={{backgroundColor: "#303030", marginLeft: 20, borderRadius: 5, alignItems: "center", justifyContent: "center", marginTop: 10, flex: 1 }} onPress={() => {setOpened(true)}}>
                            <Text style={{ fontSize: 20, color: isDarkMode ? "#FFFFFF" : "#010101", marginBottom: -20}}>{formattedDate.toString()}</Text>
                            <Text style={{ fontSize: 15, color: isDarkMode ? "#CCCCCC" : "#010101" }}>{formattedHour.toString()}</Text>
                        </TouchableOpacity>
                        <DatePicker modal open={opened} date={date} onConfirm={(date) => {setOpened(false); setDate(date)}} onCancel={() => {setOpened(false)}} pickerTitle="날짜 선택" />
                        <TextInput style={{ fontSize: 23, backgroundColor: "#303030", marginLeft: 10, marginRight: 20, paddingVertical: 15, paddingHorizontal: 20, borderRadius: 5, alignItems: "center", justifyContent: "center", marginTop: 10, flex: 3}} placeholder="할 일" placeholderTextColor={"#999999"} value={todo} onChangeText={setTodo} />
                    </View>
                    <TouchableOpacity style={{ marginBottom: 20, backgroundColor: "#303030", paddingVertical: 15, marginHorizontal: 20, borderRadius: 5, alignItems: "center", justifyContent: "center", marginTop: 10 }} onPress={addTask}>
                        <Text style={{ fontSize: 23, color: isDarkMode ? "#FFFFFF" : "#010101" }}>작업 추가</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default TaskScreen;