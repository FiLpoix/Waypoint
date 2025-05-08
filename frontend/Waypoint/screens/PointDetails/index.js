import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../../components/BottomNav";
import styles from "./style";
import api from "../../services/api";

const PointDetails = ({ route, navigation }) => {
  const { point } = route.params;
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [favoriteId, setFavoriteId] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const user = await AsyncStorage.getItem("user_id");

        if (token && user) {
          setUserId(user);

          const response = await api.get("/favorites/", {
            params: {
              user: user,
              tourist_point: point.id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const filteredFavorites = response.data.filter(
            (fav) => fav.tourist_point === point.id
          );

          if (filteredFavorites.length > 0) {
            setLiked(true);
            setFavoriteId(response.data[0].id);
          } else {
            setLiked(false);
          }

          const ratingsResponse = await api.get("/ratings/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const filteredRatings = ratingsResponse.data.filter(
            (rating) => String(rating.object_id) === String(point.id)
          );
          setRatings(filteredRatings);
        }
      } catch (error) {
        console.log("Erro ao verificar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleLike = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("access_token");
      const user = await AsyncStorage.getItem("user_id");

      if (!token || !user) {
        Alert.alert("Erro", "Usuário não autenticado");
        return;
      }

      if (!liked) {
        const response = await api.post(
          "/favorites/",
          {
            tourist_point: point.id,
            user: user,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLiked(true);
        setFavoriteId(response.data.id);
        Alert.alert("Sucesso", "Ponto favoritado com sucesso!");
      } else {
        await api.delete(`/favorites/${favoriteId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLiked(false);
        setFavoriteId(null);
        Alert.alert("Sucesso", "Ponto removido dos favoritos!");
      }
    } catch (error) {
      console.log(
        "Erro ao favoritar ponto:",
        error.response?.data || error.message
      );
      Alert.alert("Erro", "Não foi possivel favoritar");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentPress = () => {
    navigation.navigate("Rating", { point, userId });
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
                color={liked ? "red" : "#fff"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleCommentPress}
            >
              <FontAwesome name="comment-o" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Localização:</Text>
          <Text style={styles.infoText}>{point.location_lat}</Text>
          <Text style={styles.infoText}>{point.location_long}</Text>
        </View>

        <Text style={styles.description}>{point.description}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={[styles.infoLabel, { marginBottom: 10 }]}>
            Avaliações:
          </Text>
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <View
                key={rating.id}
                style={styles.description} >
                <Text style={styles.infoText} >Nota: {rating.score} ⭐</Text>
                <Text style={styles.infoText} >Comentário: {rating.commment}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.infoText}>
              Nenhuma avaliação para este ponto ainda.
            </Text>
          )}
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
};

export default PointDetails;
