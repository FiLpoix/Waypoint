import React, { useEffect, useState} from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from './style';
import api from '../../services/api';


export default function({navigation}) {
  const [points, setPoints] = useState([]);
  const [filteredPoints, setFilteredPoints] = useState([]);
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    async function fetchPoints() {
      try {
        const response = await api.get('/tourist_points');
        setPoints(response.data);
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    }

    fetchPoints();
  }, []);

  console.log(points[0].city?.name)
  useEffect(() => {
    if (cityFilter.trim() === '') {
      setFilteredPoints(points);
    } else {
      const filtered = points.filter(point =>
        (point.city?.name || '').toLowerCase().includes(cityFilter.toLowerCase())
      );
      setFilteredPoints(filtered);
    }
  }, [cityFilter, points]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <TextInput
          placeholder="Filtrar por cidade"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={cityFilter}
          onChangeText={setCityFilter}
        />
        <Ionicons name="menu" size={24} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {filteredPoints.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image source={{ uri: item.image_url }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
            <Text style={styles.cardSubText}>{item.city?.name}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="happy" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}