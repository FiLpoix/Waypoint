// RatingScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export default function RatingScreen({ route, navigation }) {
  const { point, userId } = route.params;

  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    if (score === 0) {
      Alert.alert('Erro', 'Por favor, selecione uma nota.');
      return;
    }

    try {
        const token = await AsyncStorage.getItem('access_token');
    console.log('Token recuperado:', token);

    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado');
      return;
    }

      const response = await api.post('/ratings/', {
        ContentType: 9,
        object_id: point.id,
        user: userId,
        score: score,
        commment: comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });

    console.log('Avaliação enviada:', response.data);
    Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
    navigation.goBack();
    } catch (error) {
        console.log('Erro ao enviar avaliação:', error.response?.data || error.message);
        Alert.alert('Erro', 'Não foi possível enviar a avaliação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliar {point.title}</Text>

      <StarRating
        rating={score}
        onChange={setScore}
        starSize={40}
        color="#FFD700"
      />

      <TextInput
        style={styles.input}
        placeholder="Escreva seu comentário (opcional)"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />

      <Button title="Enviar Avaliação" onPress={handleSubmit} color="#007BFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
    textAlignVertical: 'top',
  },
});
