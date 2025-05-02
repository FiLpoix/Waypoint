import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import BottomNav from "../../components/BottomNav";
import api from "../../services/api";
import styles from "./style";

export default function Categories({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPointsByCategory() {
      try {
        const response = await api.get(`/tourist_points/`);

        console.log('categoryId recebido:', categoryId);
    response.data.forEach((point) => {
      console.log(`Point ID ${point.id} -> Category:`, point.Category);
    });

        const filteredPoints = response.data.filter(
            (point) => String(point.Category) === String(categoryId)
          );

        setPoints(filteredPoints);
      } catch (error) {
        console.error("Erro ao buscar pontos por categoria:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPointsByCategory();
  }, [categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Pontos Turisticos em {categoryName}</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : points.length === 0 ? (
        <Text>No points found for this category.</Text>
      ) : (
        <FlatList
          data={points}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PointDetails", { point: item })
              }
            >
              <Image
                source={{ uri: item.image_url }}
                style={styles.recommendedImage}
              />
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <BottomNav navigation={navigation} />
    </View>
  );
}
