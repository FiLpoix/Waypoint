import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './style';
import axios from 'axios'
import api from '../../services/api';

export default function ({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/api/register/', {
                username: name,
                email,
                password,
            });

            if (response.status === 201) {
                console.log('Conta criada com sucesso:', response.data);
                Alert.alert('Sucesso', 'Conta criada com sucesso!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro', 'Falha ao criar conta. Tente novamente.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar criar a conta.');
            console.error('Error during registration:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>

            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Create</Text>
            <Text style={styles.title}>Your account</Text>

            <Text style={styles.label}>Usuário:</Text>
            <TextInput style={styles.input} placeholder="Digite seu nome"
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName} />

            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} placeholder="Digite seu email"
                placeholderTextColor="#888"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail} />

            <Text style={styles.label}>Password:</Text>
            <TextInput style={styles.input} placeholder="Digite sua senha"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword} />

            <Text style={styles.label}>Confirm password:</Text>
            <TextInput style={styles.input} placeholder="Confirme sua senha"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword} />

            <View style={styles.signInText}>
                <Text style={{ color: '#fff' }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: '#B5838D', marginLeft: 5 }}>Sign In</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading} >
                <Text style={styles.registerText}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
            </TouchableOpacity>
        </View>
    );
}
