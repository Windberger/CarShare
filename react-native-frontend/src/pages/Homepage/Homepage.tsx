import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Homepage() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {/* Navbar */}
            <View style={styles.navbar}>
                <Text style={styles.logo}>CarShare</Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Hero Section */}
            <View style={styles.hero}>
                <Text style={styles.heroTitle}>Create Carpools with Your Friends</Text>
                <Text style={styles.heroSubtitle}>Save money, reduce emissions, and travel smarter.</Text>
                <TouchableOpacity
                    style={styles.getStartedButton}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
            </View>

            {/* Features Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Why Use CarShare?</Text>
                <View style={styles.features}>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureTitle}>Save Money</Text>
                        <Text>Split fuel costs with friends.</Text>
                    </View>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureTitle}>Eco-Friendly</Text>
                        <Text>Reduce CO₂ emissions by sharing rides.</Text>
                    </View>
                    <View style={styles.featureCard}>
                        <Text style={styles.featureTitle}>Easy to Use</Text>
                        <Text>Plan and track rides effortlessly.</Text>
                    </View>
                </View>
            </View>

            {/* Testimonials */}
            <View style={styles.testimonials}>
                <Text style={styles.sectionTitle}>What Our Users Say</Text>
                <Text style={styles.testimonial}>"This app has saved me so much money on commuting!" – Alex</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2025 CarShare. All rights reserved.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#194569',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    logo: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 8,
    },
    navLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    navText: {
        color: 'white',
        textDecorationLine: 'underline',
    },
    loginButton: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: 'flex-end',
    },
    loginText: {
        color: '#194569',
        fontWeight: 'bold',
    },
    hero: {
        backgroundColor: '#194569',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    heroTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    heroSubtitle: {
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
    },
    getStartedButton: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 20,
    },
    getStartedText: {
        color: '#194569',
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        marginBottom: 50,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    features: {
        flexDirection: 'column',
        gap: 16,
    },
    featureCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    featureTitle: {
        fontWeight: '600',
        marginBottom: 6,
    },
    testimonials: {
        backgroundColor: '#e5e7eb',
        padding: 20,
        alignItems: 'center',
    },
    testimonial: {
        marginTop: 10,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    footer: {
        backgroundColor: '#194569',
        padding: 16,
        alignItems: 'center',
    },
    footerText: {
        color: 'white',
    },
});
