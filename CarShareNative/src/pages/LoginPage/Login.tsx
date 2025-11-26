import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    StyleSheet,
    ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginUser, registerUser } from "../../services/LoginService";
import { useUser } from "../../context/UserContext";

export default function Login() {
    const [register, setRegister] = useState(false);
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const navigation = useNavigation<any>();
    const { setUserId } = useUser();

    const isEmailValid = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid =
        password.length >= 8 &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password) &&
        password === repeatPassword;

    const handleSubmit = () => {
        if (register) {
            const user = {
                email,
                firstname: firstName,
                lastname: lastName,
                password
            };
            registerUser(user, setUserId)
                .then((res) => {
                    setUserId(res);
                    login(email, password);
                })
                .catch(() => {
                    Alert.alert("Signup failed");
                });
        } else {
            login(email, password);
        }
    };

    const login = (email: string, password: string) => {
        console.log("test")

        loginUser({ email, password }, setUserId)
            .then((res) => {
                console.log("logged in")
                setUserId(res);

                navigation.navigate("Dashboard");
            })
            .catch((err) => {
                Alert.alert("Login failed: " + err);
            });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20} // ggf. anpassen
        >
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.left}>
                <Text style={styles.title}>{register ? "Register" : "Login"}</Text>
                {register && (
                    <View style={styles.row}>
                        <TextInput
                            style={styles.inputHalf}
                            placeholder="Firstname"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.inputHalf}
                            placeholder="Lastname"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                {register && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Repeat Password"
                            value={repeatPassword}
                            secureTextEntry
                            onChangeText={setRepeatPassword}
                        />
                        <View>
                            <Text style={{ color: password.length >= 8 ? "green" : "red" }}>
                                • Has 8 digits
                            </Text>
                            <Text style={{ color: /[0-9]/.test(password) ? "green" : "red" }}>
                                • Has a number
                            </Text>
                            <Text style={{ color: /[^A-Za-z0-9]/.test(password) ? "green" : "red" }}>
                                • Has a special value
                            </Text>
                            <Text
                                style={{
                                    color:
                                        password === repeatPassword && password !== "" ? "green" : "red"
                                }}
                            >
                                • Passwords are the same
                            </Text>
                        </View>
                    </>
                )}
                <TouchableOpacity
                    style={[
                        styles.button,
                        (register
                            ? !isPasswordValid ||
                            !isEmailValid(email) ||
                            !firstName.trim() ||
                            !lastName.trim()
                            : !isEmailValid(email) || !password.trim()) && styles.buttonDisabled
                    ]}
                    onPress={handleSubmit}
                    disabled={
                        register
                            ? !isPasswordValid ||
                            !isEmailValid(email) ||
                            !firstName.trim() ||
                            !lastName.trim()
                            : !isEmailValid(email) || !password.trim()
                    }
                >
                    <Text style={styles.buttonText}>
                        {register ? "Register" : "Login"}
                    </Text>
                </TouchableOpacity>
                <View style={styles.switchRow}>
                    <Text style={styles.switchText}>
                        {register ? "Already registered?" : "Not registered?"}
                    </Text>
                    <TouchableOpacity onPress={() => setRegister(!register)}>
                        <Text style={styles.switchLink}>
                            {register ? "Login" : "Register"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
        minHeight: "100%",
    },
    left: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    right: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#194569",
        marginBottom: 32,
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        width: "100%",
        marginBottom: 16,
    },
    input: {
        width: "100%",
        height: 48,
        backgroundColor: "#f3f4f6",
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        color: "#000",
        borderWidth: 1,
        borderColor: "#e5e7eb",
    },
    inputHalf: {
        flex: 1,
        height: 48,
        backgroundColor: "#f3f4f6",
        borderRadius: 12,
        paddingHorizontal: 16,
        marginRight: 8,
        color: "#000",
        borderWidth: 1,
        borderColor: "#e5e7eb",

    },
    button: {
        backgroundColor: "#194569",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 8,
        marginBottom: 16,
        width: "100%",
    },
    buttonDisabled: {
        backgroundColor: "#d1d5db",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    switchText: {
        color: "#194569",
    },
    switchLink: {
        color: "#194569",
        marginLeft: 8,
        textDecorationLine: "underline",
    },
    image: {
        width: "100%",
        height: 350,
    },
});
