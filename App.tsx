import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';
import { RootStackParamList } from "./src/types/Types";

//Import telas
import LoadingScreen from "./src/screens/initials/LoadingScreen";
import DadosScreen from "./src/screens/initials/DadosScreen";
import HomeScreen from "./src/screens/princ/HomeScreen";

//Tela de COnfiguração
import SettingsScreen from "./src/screens/setings/SettingsScreen";
const Stack = createStackNavigator<RootStackParamList>();

export default function App () {
     return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false  }}>
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Dados" component={DadosScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

registerRootComponent(App);
