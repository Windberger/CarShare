import React, {useState, useContext} from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../context/UserContext';
import {createAddress} from '../services/AddressService';
import {createRoute} from '../services/RouteService';
import {ICreateAddress} from '../model/IAddress';
import {ICreateRoute} from '../model/IRoute';

export default function CreateRouteForm() {
    const navigation = useNavigation();
    const userContext = useContext(UserContext);
    if (!userContext) throw new Error("UserContext not found");
    const {userId} = userContext;

    const [startAddress, setStartAddress] = useState<ICreateAddress>({
        country: '',
        postalCode: '',
        city: '',
        street: '',
        houseNumber: ''
    });

    const [destinationAddress, setDestinationAddress] = useState<ICreateAddress>({
        country: '',
        postalCode: '',
        city: '',
        street: '',
        houseNumber: ''
    });

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showDestPicker, setShowDestPicker] = useState(false);

    const handleChange = (field: keyof ICreateAddress, value: string, type: 'start' | 'destination') => {
        if (type === 'start') {
            setStartAddress(prev => ({...prev, [field]: value}));
        } else {
            setDestinationAddress(prev => ({...prev, [field]: value}));
        }
    };

    const handleCountrySelect = (country: Country, type: 'start' | 'destination') => {
        if (type === 'start') {
            setStartAddress(prev => ({...prev, country: country.cca2}));
        } else {
            setDestinationAddress(prev => ({...prev, country: country.cca2}));
        }
    };

    const handleSubmit = async () => {
        try {
            const startId = await createAddress(startAddress);
            const destinationId = await createAddress(destinationAddress);

            const datetime = `${startDate}T${startTime}`;
            const route: ICreateRoute = {
                startAddressId: startId,
                endAddressId: destinationId,
                startTime: datetime,
                driverId: userId!
            };

            const routeId = await createRoute(route);
            navigation.navigate('DetailRoute', {id: routeId});
        } catch (error: any) {
            if (error.status === 403) {
                Alert.alert("This route already exists!");
            } else if (error.status === 400) {
                Alert.alert("Invalid address or input");
            } else {
                Alert.alert("An unknown error occurred");
            }
        }
    };

    const renderAddressForm = (label: string, address: ICreateAddress, type: 'start' | 'destination') => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{label}</Text>
            {/*<CountryPicker*/}
            {/*    withFilter*/}
            {/*    withFlag*/}
            {/*    withCountryNameButton*/}
            {/*    withAlphaFilter*/}
            {/*    countryCode="AT"*/}
            {/*    onSelect={(country) => handleCountrySelect(country, type)}*/}
            {/*/>*/}
            <TextInput
                style={styles.input}
                placeholder="Country Code"
                value={address.country}
                onChangeText={(text) => handleChange("country", text, type)}
            />
            <TextInput
                style={styles.input}
                placeholder="Postal Code"
                value={address.postalCode}
                onChangeText={(text) => handleChange("postalCode", text, type)}
            />
            <TextInput
                style={styles.input}
                placeholder="City"
                value={address.city}
                onChangeText={(text) => handleChange("city", text, type)}
            />
            <TextInput
                style={styles.input}
                placeholder="Street"
                value={address.street}
                onChangeText={(text) => handleChange("street", text, type)}
            />
            <TextInput
                style={styles.input}
                placeholder="House Number"
                value={address.houseNumber}
                onChangeText={(text) => handleChange("houseNumber", text, type)}
            />
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Carpool</Text>
            {renderAddressForm("Start Address", startAddress, 'start')}
            {renderAddressForm("Destination Address", destinationAddress, 'destination')}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Start Time</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Start Date (YYYY-MM-DD)"
                    value={startDate}
                    onChangeText={setStartDate}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Start Time (HH:MM)"
                    value={startTime}
                    onChangeText={setStartTime}
                />
            </View>

            <Button title="Create Carpool" onPress={handleSubmit}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#F5F5F5',
        flexGrow: 1
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#194569',
        textAlign: 'center',
        marginBottom: 20
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#194569'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff'
    }
});
