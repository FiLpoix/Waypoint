import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './style'

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>

<Image source={require('../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login To</Text>
      <Text style={styles.title}>Your Account</Text>

      <Text style={styles.label}>Usuário:</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome" placeholderTextColor="#888" />

      <Text style={styles.label}>Password:</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" placeholderTextColor="#888" secureTextEntry />

      <View style={styles.signInText}>
        <Text style={{ color: '#fff' }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: '#B5838D', marginLeft: 5 }}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
}
