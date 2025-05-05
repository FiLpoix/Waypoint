import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../../components/BottomNav";
import api from "../../services/api";

const FavoriteScreen = ({ navigation }) => {
  const [favoritePoints, setFavoritePoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("access_token");
      if (!storedToken) {
        Alert.alert("Sessão Expirada", "Faça login novamente.");
        navigation.navigate("Login");
        return;
      }
      setToken(storedToken);
      fetchFavorites(storedToken);
    };

    fetchToken();
  }, []);

  const fetchFavorites = async (authToken) => {
    try {
      const response = await api.get(`/favorites/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const favoritesRaw = response.data;

      const detailedFavorites = await Promise.all(
        favoritesRaw.map(async (fav) => {
          try {
            const pointRes = await api.get(`/tourist_points/${fav.tourist_point}/`, {
              headers: { Authorization: `Bearer ${authToken}` },
            });
  
            return {
              id: fav.id,
              tourist_point: pointRes.data,
            };
          } catch (err) {
            console.error("Erro ao buscar ponto:", err.message);
            return null;
          }
        })
      );
  
      const filtered = detailedFavorites.filter((fav) => fav !== null);
      setFavoritePoints(filtered);
      console.log("Pontos favoritos:", filtered);
    } catch (error) {
      console.error("Erro ao encontrar pontos favoritos:", error.response?.data || error.message);
      Alert.alert("Erro", "Não foi possível carregar os pontos favoritos.");
    } finally {
      setLoading(false);
    }
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("PointDetails", { point: item.tourist_point })}
    >
      <Image
        source={{ uri: item.tourist_point.image_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.tourist_point.title}</Text>
        <Text style={styles.itemSubtitle}>
          {item.tourist_point.description?.slice(0, 80)}...
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>

      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={favoritePoints}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavoriteItem}
          contentContainerStyle={styles.list}
        />
      )}

      <BottomNav navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#1C2025",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#333",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  list: {
    paddingBottom: 80,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  itemContent: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});

export default FavoriteScreen;