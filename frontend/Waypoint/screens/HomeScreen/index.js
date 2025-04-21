import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import api from "../../services/api";
import BottomNav from "../../components/BottomNav";

export default function ({ navigation }) {
  const [points, setPoints] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    points: true,
    categories: true,
  });

  useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await api.get("/tourist_points");
        setPoints(response.data);
      } catch (error) {
        console.error("Erro ao buscar pontos:", error);
      } finally {
        setLoading((prev) => ({ ...prev, points: false }));
      }
    }

    async function fetchCategories() {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading((prev) => ({ ...prev, categories: false }));
      }
    }

    Promise.all([fetchPoints(), fetchCategories()]);
  }, []);

  const isLoading = loading.points || loading.categories;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Hello, User!</Text>
          <Text style={styles.subtitle}>Explore new locations!</Text>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={16} color="#aaa" />
            <Text style={styles.locationText}>Teresina, Piauí</Text>
          </View>
        </View>
        <Ionicons name="person-circle-outline" size={32} color="#fff" />
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryBox}>
            <Image
              source={{ uri: item.icon }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{item.tipo}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      />
      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>Recommended</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cities")}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.recommendedScroll}
      >
        {points.map((item) => (
          <Image
            key={item.id}
            source={{ uri: item.image_url }}
            style={styles.recommendedImage}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>Adicione um ponto turístico!!</Text>
        <View style={styles.plusCircle}>
          <Text style={styles.plus}>+</Text>
        </View>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}
