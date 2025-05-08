import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./RegisterScreen/style";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const decodeToken = (token) => {
    try {
      if (!token || typeof token !== 'string') {
        throw new Error("Token inválido");
      }
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
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
        console.log("Token recebido:", access);

        if (!access) {
          throw new Error("Token de acesso não recebido");
        }

        const decodedToken = decodeToken(access);
        console.log("Token decodificado:", decodedToken);


        const userId = decodedToken?.user_id || decodedToken?.sub;
        if (!userId) {
          throw new Error("ID do usuário não encontrado no token");
        }

        await AsyncStorage.multiSet([
          ["access_token", access],
          ["refresh_token", refresh],
          ["username", username],
          ["user_id", userId.toString()],
        ]);

        navigation.navigate("Home");
      } else {
        Alert.alert("Erro", response.data?.detail || "Login falhou. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Full error:", error);
      Alert.alert(
        "Erro", 
        error.response?.data?.detail || error.message || "Ocorreu um erro ao tentar fazer login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Faça o Login</Text>
      <Text style={styles.title}>Na sua conta</Text>

      <Text style={styles.label}>Usuário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.signInText}>
        <Text style={{ color: "#fff" }}>Ainda não possui conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#B5838D", marginLeft: 5 }}>Cadastro</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.registerText}>LOGIN</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}