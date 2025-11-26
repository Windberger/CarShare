import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import {UserProvider} from "./src/context/UserContext";
import {NavigationContainer} from "@react-navigation/native";
import Login from "./src/pages/LoginPage/Login";
import Homepage from "./src/pages/Homepage/Homepage";
import Dashboard from "./src/pages/Dashboard/Dashboard";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RouteDetails from "./src/pages/DetailPage/RouteDetails";
import CreateRouteForm from "./src/components/CreateRouteForm";
import CountryPickerTest from "./src/pages/CountryPickerTest";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import React from "react";
import ManualSearch from "./src/pages/ManualSearch";
import JoinRouteForm from "./src/components/JoinRouteForm";
export type RootStackParamList = {
    Login: undefined;
    Homepage: undefined;
    Dashboard: undefined;
    CreateCarpool: undefined;
    DetailRoute: { id: number };
    JoinRoute: { joinCode: string };
};

export default function App() {
    const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
      <UserProvider>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Homepage">
                  <Stack.Screen name="Login" component={Login}/>
                  <Stack.Screen name="Homepage" component={Homepage} />
                  <Stack.Screen name="Dashboard" component={Dashboard}/>
                  <Stack.Screen name="CreateCarpool" component={ManualSearch} />
                  <Stack.Screen name="DetailRoute" component={RouteDetails} />
                  {/*<Stack.Screen name="JoinRoute" component={JoinRouteForm} />*/}
              </Stack.Navigator>
          </NavigationContainer>
      </UserProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
