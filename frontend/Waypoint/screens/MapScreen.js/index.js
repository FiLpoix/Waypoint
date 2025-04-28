// src/screens/MapScreen.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../../services/api';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário permitir o acesso à localização.');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Fetch dos pontos turísticos (ou o que quiser)
      fetchPointsFromAPI();

      setLoading(false);
    })();
  }, []);

  async function fetchPointsFromAPI() {
    try {
      const response = await api.get('/tourist_points');
      setPoints(response.data);
    } catch (error) {
      console.error('Erro ao buscar pontos:', error);
    }
  }

  if (loading || !location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <MapView style={styles.map} initialRegion={region} showsUserLocation>
      {/* Marker da localização do usuário */}
      <Marker coordinate={region} title="Você está aqui" />

      {/* Markers vindos do endpoint */}
      {points.map((point) => (
        <Marker
          key={point.id}
          coordinate={{
            latitude: Number(point.location_lat),
            longitude: Number(point.location_long),
          }}
          title={point.title}
          description={point.description}
          pinColor="#556B2F"
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
