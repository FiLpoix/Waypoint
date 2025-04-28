import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRatingScreen = ({ route, navigation }) => {
    const { point } = route.params;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddRating = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                Alert.alert('Erro', 'Usuário não autenticado');
                return;
            }

            const response = await api.post('/ratings/', {
                tourist_point: point.id,
                rating: rating,
                comment: comment,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert('Sucesso', 'Avaliação adicionada com sucesso!');
            navigation.navigate('PointDetails', { point });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível adicionar a avaliação.');
        } finally {
            setLoading(false);
        }
    };
}

export default AddRatingScreen;