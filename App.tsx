import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerRootComponent } from 'expo';

//Import telas
import LoadingScreen from "./src/screens/initials/LoadingScreen";
import DadosScreen from "./src/screens/initials/DadosScreen";

const Stack = createStackNavigator();

export default function App () {
     return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false  }}>
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Dados" component={DadosScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

registerRootComponent(App);
