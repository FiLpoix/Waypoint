import React, { useEffect, useState} from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from './style';
import api from '../../services/api';
import BottomNav from '../../components/BottomNav';

export default function({navigation}) {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await api.get('/tourist_points');
        setPoints(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <TextInput
          placeholder="Filtrar por cidade"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />

        <Ionicons name="menu" size={24} color="#fff" />
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} style={styles.gallery}>
      <View style={styles.cardContainer}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Erro: {error}</Text>
        ) : (
          points.map((point) => (
        <TouchableOpacity
          key={point.id} 
          style={styles.card}
          onPress={() => navigation.navigate('PointDetails', { point: point })}
        >
          <Image source={{ uri: point.image_url }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{point.title}</Text>
        </TouchableOpacity>
          ))
        )}
        </View>
      </ScrollView>

      <BottomNav navigation={navigation} />
    </View>
  );
}