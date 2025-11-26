import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
//import { useNavigation } from '@react-navigation/native';

export default function Navbar() {
    //const navigation = useNavigation();

    return (
        <View style={styles.navbar}>
            <Text style={styles.logo}>DriveEase</Text>

            <View style={styles.navItems}>
                {/*<TouchableOpacity onPress={() => navigation.navigate('CreateRoute')}>*/}
                {/*    <Text style={styles.navText}>Create</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => navigation.navigate('Home')}>*/}
                {/*    <Text style={styles.navText}>Search</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => navigation.navigate('MyRoutes')}>*/}
                {/*    <Text style={styles.navText}>My Routes</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity onPress={() => navigation.navigate('Settings')}>*/}
                {/*    <Text style={styles.navText}>Settings</Text>*/}
                {/*</TouchableOpacity>*/}
                <TouchableOpacity >
                    <Text style={styles.navText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.navText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.navText}>My Routes</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#194569',
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    navItems: {
        flexDirection: 'row',
        gap: 15
    },
    navText: {
        color: '#fff',
        fontSize: 16
    }
});
