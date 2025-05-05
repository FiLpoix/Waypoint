import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from "../../components/BottomNav";
import styles from "./style";
import api from "../../services/api";

const PointDetails = ({ route, navigation }) => {
  const { point } = route.params;
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const user = await AsyncStorage.getItem('user_id');
        
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

  const toggleLike = async () => {
    if (loading) return

    setLoading(true);

    try {
        const token = await AsyncStorage.getItem('access_token');
        const user = await AsyncStorage.getItem('user_id');

        if (!token || !user) {
          Alert.alert('Erro', 'Usuário não autenticado');
          return;
        }

        if (!liked) {
          const response = await api.post('/favorites/', {
            tourist_point: point.id,
            user: user
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLiked(response.data);
          console.log('Dados recebidos:', response.data);
          Alert.alert('Sucesso', 'Ponto favoritado com sucesso!')
        } else {
          const response = await api.delete(`/favorites/${favoriteId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setLiked(false);
        }
    } catch (error) {
      console.log('Erro ao favoritar ponto:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possivel favoritar')
    } finally { 
      setLoading(false);
    }
  };

  const handleCommentPress = () => {
    navigation.navigate('Rating', { point, userId }); 
  };

  return (
    <View style={styles.pageContainer}>
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: point.image_url }} style={styles.image} />
      <View style={styles.headerRow}>
        <Text style={styles.title}>{point.title}</Text>
        <View style={styles.iconButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleLike}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={30}
                color={liked ? "red" : "#fff"} />
            </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleCommentPress}>
            <FontAwesome name="comment-o" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoText}>{point.location_lat}</Text>
        <Text style={styles.infoText}>{point.location_long}</Text>
      </View>

      <Text style={styles.description}>{point.description}</Text>

    </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
};

export default PointDetails;
