import React, {useContext, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Location from 'expo-location';
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import {format} from 'date-fns';
import {autocompleteAddress, geocode} from "../services/GoogleMapsService";
import {IAutocompleteResponsePlace, ICoordinate, ICreateGoogleMapsAddress} from "../model/IAddress";
import {createRoute} from "../services/RouteService";
import {ICreateRoute} from "../model/IRoute";
import {UserContext} from "../context/UserContext";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

interface IField {
    id: number;
    label: string;
    query: string;
    placeId?: string;
    results: IAutocompleteResponsePlace[];
}

export default function RouteSearch() {
    const [fields, setFields] = useState<IField[]>([
        {id: 0, label: 'Start', query: '', results: []},
        {id: 1, label: 'Destination', query: '', results: []}
    ]);

    const [date, setDate] = useState(new Date());

    const userContext = useContext(UserContext);
    if (!userContext) throw new Error("UserContext not found");
    const {userId} = userContext;
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const updateQuery = (id: number, text: string) =>
        setFields(fields.map(f => f.id === id ? {...f, query: text} : f));

    const searchPlaces = async (id: number) => {
        const field = fields.find(f => f.id === id);
        if (!field || field.query.trim().length < 3) return;

        console.log("searchPlaces", field.query);
        const res: IAutocompleteResponsePlace[] = await autocompleteAddress(field.query.trim());
        setFields(fields.map(f => f.id === id ? {...f, results: res} : f));
    };

    const selectPlace = async (id: number, placeId: string, description: string) => {
        console.log("selectPlace", id, placeId, description);
        setFields(fields.map(f => f.id === id ? {...f, query: description, placeId: placeId, results: []} : f));
    };

    const clearField = (id: number) =>
        setFields(fields.map(f => f.id === id ? {...f, query: '', placeId: undefined, results: []} : f));

    const useCurrentLocation = async (id: number) => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Standortzugriff nicht erlaubt');
            return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        const coords: ICoordinate = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
        }

        const res: IAutocompleteResponsePlace = await geocode(coords);

        setFields(fields.map(f => f.id === id ? {...f, query: res.description, placeId: res.placeId, results: []} : f));
    };

    const addStop = () => {
        setFields([
            ...fields.slice(0, fields.length - 1),
            {id: Date.now(), label: 'Stop', query: '', results: []},
            fields[fields.length - 1]
        ]);
    };

    const onChange = (event, selectedDate) => {
        setDate(selectedDate);
    };

    const showMode = (currentMode) => {

        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const submit = async () => {
        console.log('Creating carpool with:', fields, 'on', date);
        if (fields.some(f => f.query.trim() === '')) {
            fields.forEach(f => console.log(f));
            alert('Please fill in all address fields and click the search icon');
            return;
        }

        const addresses: ICreateGoogleMapsAddress[] = fields.map(f => {
            if (!f.placeId) {
                throw new Error('PlaceId missing for field ' + f.label);
            }
            return {
                placeId: f.placeId,
                description: f.query
            };
        });

        const createRouteObj: ICreateRoute = {
            addresses: addresses,
            startTime: date.toISOString(),
            driverId: userId!
        };

        const routeId: number = await createRoute(createRouteObj);
        console.log('Route created with id:', routeId);

        navigation.navigate('DetailRoute', {id: routeId});

    }

    const renderField = ({item: field}: { item: IField }) => (
        <View style={{marginBottom: 20}}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Ionicons name="location-outline" size={20} color="#007AFF" style={{marginRight: 5}}/>
                <TextInput
                    value={field.query}
                    onChangeText={(text) => updateQuery(field.id, text)}
                    placeholder={`${field.label}`}
                    style={{flex: 1, paddingVertical: 10}}
                />
                {field.query.length > 0 && (
                    <TouchableOpacity onPress={() => clearField(field.id)} style={{marginLeft: 5}}>
                        <Ionicons name="close-circle" size={24} color="#888"/>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => searchPlaces(field.id)} style={{marginLeft: 10}}>
                    <Ionicons name="search" size={22} color="#007AFF"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => useCurrentLocation(field.id)} style={{marginLeft: 10}}>
                    <Ionicons name="navigate" size={22} color="#007AFF"/>
                </TouchableOpacity>

                {fields.findIndex(f => f.id === field.id) > 0 && fields.findIndex(f => f.id === field.id) < fields.length - 1 && (
                    <TouchableOpacity onPress={() => {
                        setFields(fields.filter(f => f.id !== field.id));
                    }} style={{marginLeft: 10}}>
                        <Ionicons name="trash" size={22} color="#FF3B30"/>
                    </TouchableOpacity>
                )}

            </View>

            {field.results.length > 0 && (
                <FlatList
                    data={field.results}
                    keyExtractor={(item) => item.placeId}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => selectPlace(field.id, item.placeId, item.description)}
                            style={{
                                padding: 12,
                                backgroundColor: '#fff',
                                borderBottomWidth: 1,
                                borderBottomColor: '#eee'
                            }}
                        >
                            <Text>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );

    return (
        <FlatList
            contentContainerStyle={{padding: 20}}
            data={fields}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderField}
            ListFooterComponent={
                <View>
                    <TouchableOpacity
                        onPress={addStop}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: '#007AFF',
                            borderRadius: 10,
                            marginTop: 20
                        }}
                    >
                        <Ionicons name="add-circle-outline" size={20} color="#fff" style={{marginRight: 5}}/>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>Add Stop</Text>
                    </TouchableOpacity><View style={{alignItems: 'center', marginTop: 20}}>


                    <View
                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                        <TouchableOpacity
                            onPress={showDatepicker}
                            style={{
                                backgroundColor: '#fff',
                                borderColor: '#007AFF',
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingVertical: 10,
                                paddingHorizontal: 24,
                                marginBottom: 10,
                                width: 150,
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{color: '#007AFF', fontWeight: 'bold'}}>Choose Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={showTimepicker}
                            style={{
                                backgroundColor: '#fff',
                                borderColor: '#007AFF',
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingVertical: 10,
                                paddingHorizontal: 24,
                                marginBottom: 10,
                                width: 150,
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{color: '#007AFF', fontWeight: 'bold'}}>Choose Time</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{marginTop: 10, color: '#333', fontSize: 18}}>
                        Currently Selected: {format(date, 'dd.MM.yyyy')} um {format(date, 'HH:mm')}
                    </Text>

                    <TouchableOpacity
                        onPress={submit}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            backgroundColor: '#007AFF',
                            borderRadius: 10,
                            marginTop: 40,
                            width: "100%"
                        }}
                    >
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>Create Carpool</Text>
                    </TouchableOpacity>
                </View>
                </View>
            }
        />
    );
}
