import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './RegisterScreen/style'
import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/api/token/`, {
        username,
        password,
      });
      if (response.status === 200) {
        const { access, refresh } = response.data;

        await AsyncStorage.setItem('access_token', access);
        await AsyncStorage.setItem('refresh_token', refresh);
        await AsyncStorage.setItem('username', username)
        console.log('Tokens salvos:', access, refresh);


        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Login falhou. Verifique suas credenciais.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>

      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login To</Text>
      <Text style={styles.title}>Your Account</Text>

      <Text style={styles.label}>Usuário:</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername} />

      <Text style={styles.label}>Password:</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword} />

      <View style={styles.signInText}>
        <Text style={{ color: '#fff' }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#B5838D', marginLeft: 5 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleLogin} >
        <Text style={styles.registerText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}
