import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './style'

export default function ({ navigation }) {
    return (
        <View style={styles.container}>

            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Create</Text>
            <Text style={styles.title}>Your account</Text>

            <Text style={styles.label}>Usuário:</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#888" />

            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} placeholder="Digite seu email" placeholderTextColor="#888" keyboardType="email-address" />

            <Text style={styles.label}>Password:</Text>
            <TextInput style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#888" secureTextEntry />

            <Text style={styles.label}>Confirm password:</Text>
            <TextInput style={styles.input} placeholder="Confirme sua senha" placeholderTextColor="#888" secureTextEntry />

            <View style={styles.signInText}>
                <Text style={{ color: '#fff' }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#B5838D', marginLeft: 5 }}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.registerText}>REGISTER</Text>
            </TouchableOpacity>
        </View>
    );
}
