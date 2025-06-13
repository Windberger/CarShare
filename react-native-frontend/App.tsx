import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/pages/LoginPage/Login';
import Homepage from './src/pages/Homepage/Homepage';
import Dashboard from './src/pages/Dashboard/Dashboard';
import CreateRouteForm from './src/components/CreateRouteForm';
import RouteDetails from './src/pages/DetailPage/RouteDetails';
import JoinRouteForm from './src/components/JoinRouteForm';
import {UserProvider} from "./src/context/UserContext.tsx";

export type RootStackParamList = {
    Login: undefined;
    Homepage: undefined;
    Dashboard: undefined;
    CreateCarpool: undefined;
    DetailRoute: { id: string };
    JoinRoute: { joinCode: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login}/>
                    {/*<Stack.Screen name="Homepage" component={Homepage} />*/}
                    <Stack.Screen name="Dashboard" component={Dashboard}/>
                    {/*<Stack.Screen name="CreateCarpool" component={CreateRouteForm} />*/}
                    <Stack.Screen name="DetailRoute" component={RouteDetails} />
                    {/*<Stack.Screen name="JoinRoute" component={JoinRouteForm} />*/}
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}
