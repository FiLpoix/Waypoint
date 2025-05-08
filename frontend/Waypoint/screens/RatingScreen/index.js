// RatingScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import styles from './style';
import BottomNav from '../../components/BottomNav';

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
        starStyle={{ marginHorizontal: 3 }}
      />

      <TextInput
        style={styles.input}
        placeholder="Escreva seu comentário (opcional)"
        placeholderTextColor="#888"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
};
