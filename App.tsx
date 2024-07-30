import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';

import StartScreen from './screens/StartScreen';
import TaskScreen from './screens/TaskScreen';
import SettingScreen from './screens/SettingScreen';
import DebugScreen from './screens/DebugScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {

  

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ headerShown: false }}/>
<<<<<<< HEAD
          <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false}}/>
          <Stack.Screen name="DebugScreen" component={DebugScreen} options={{ headerShown: false }}/>
=======
          <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false}}/>  
>>>>>>> 66c0f93 (Version 1.1.0)
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
