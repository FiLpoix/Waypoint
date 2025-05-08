import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import api from "../../services/api";
import BottomNav from "../../components/BottomNav";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ navigation }) {
  const [points, setPoints] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    points: true,
    categories: true,
  });
  const [userLocation, setUserLocation] = useState("Teresina, Piauí");
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
      }
    };
    fetchUserData();
  }, []);

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

    async function fetchLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permissão para localização negada');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
  
        let reverseGeocode = await Location.reverseGeocodeAsync({ latitude, longitude });
        console.log(reverseGeocode)
  
        if (reverseGeocode.length > 0) {
          const info = reverseGeocode[0];

          const cityName = info.city || info.subregion || info.region || 'Localização desconhecida';
          const regionName = info.region || '';
          
          setUserLocation(`${cityName}${regionName ? ', ' + regionName : ''}`);
        }
      } catch (error) {
        console.error("Erro ao buscar localização:", error);
      }
    }
  
    Promise.all([fetchPoints(), fetchCategories()]);
    fetchLocation();
  }, []);

  const isLoading = loading.points || loading.categories;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Olá, {username ? username : 'User'}!</Text>
          <Text style={styles.subtitle}>Explore novos locais!</Text>
          <View style={styles.location}>
            <Ionicons name="location-outline" size={16} color="#aaa" />
            <Text style={styles.locationText}>{userLocation}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Map")}
              style={styles.mapButton} >
                 <Ionicons name="map-outline" size={16} color='#aaa' /> 
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-circle-outline" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <FlatList
        horizontal
        data={[...categories]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate("Categories", { 
              categoryId: Number(item.id), 
              categoryName: item.tipo 
            })}>
              <Image source={{ uri: item.icon }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.tipo}</Text>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      />
      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>Recomendados</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cities")}>
          <Text style={styles.seeAll}>Veja todos</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.recommendedScroll}
      >
        {points.map((point) => (
          <TouchableOpacity
            key={point.id}
            onPress={() => navigation.navigate("PointDetails", { point })}
          >
            <Image
              source={{ uri: point.image_url }}
              style={styles.recommendedImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}
