import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from '../../components/BottomNav';
import api from '../../services/api';

const FavoriteScreen = ({navigation}) => {
    const [favoritePoints, setFavoritePoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        const checkFavoriteStatus = async () => {
          try {
            const token = await AsyncStorage.getItem('access_token');
            const user = await AsyncStorage.getItem('user_id'); // Assumindo que você armazena o ID do usuário
            
            if (token && user) {
              setUserId(user);
              // Você pode fazer uma requisição aqui para verificar se o ponto já está favoritado
              // e atualizar o estado 'liked' de acordo
            }
          } catch (error) {
            console.log('Erro ao verificar favoritos:', error);
          } finally {
            setLoading(false);
          }
        };
        
        checkFavoriteStatus();
      }, []);

      useEffect(() => {
      const fetchFavorites = async () => {
        setLoading(true);
    
        try {
            const token = await AsyncStorage.getItem('access_token');
            const user = await AsyncStorage.getItem('user_id');
    
            if (!token || !user) {
              Alert.alert('Erro', 'Usuário não autenticado');
              return;
            }

            const response = await api.get('/favorites/', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setFavoritePoints(response.data);
              console.log('Dados recebidos:', response.data);
            } catch (error) {
          console.log('Erro ao procurar pontos favoritos:', error.response?.data || error.message);
          Alert.alert('Erro', 'Não foi possivel encontrar pontos favoritos');
        } finally { 
          setLoading(false);
        }
      };

      fetchFavorites();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Points</Text>

            <BottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
    },
});

export default FavoriteScreen;