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

        <View style={styles.card}>
          <FontAwesome name="user-circle" size={80} color="#555" style={styles.icon} />
          <Text style={styles.username}>{username || 'Usuário'}</Text>

          <TouchableOpacity style={styles.optionButton}>
            <FontAwesome name="edit" size={20} color="#4285F4" />
            <Text style={styles.optionText}>Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={20} color="#EA4335" />
            <Text style={styles.optionText}>Sair</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backButtonText}>Voltar para Home</Text>
          </TouchableOpacity>
        </View>
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
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
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
