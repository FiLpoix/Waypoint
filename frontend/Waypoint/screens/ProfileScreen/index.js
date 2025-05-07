import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../../components/BottomNav';

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    Alert.alert('Logout', 'Você saiu da conta.');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Meu Perfil</Text>

          <FontAwesome name="user-circle" size={80} color="#fff" style={styles.icon} />
          <Text style={styles.username}>{username || 'Usuário'}</Text>

          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={20} color="#EA4335" />
            <Text style={styles.optionText}>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backButtonText}>Voltar para Home</Text>
          </TouchableOpacity>
      </View>

      <BottomNav navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2025',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
  },
  icon: {
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#fff',
  },
  optionButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#2D2F3A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#fff',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#2D2F3A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
