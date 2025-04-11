import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from './style'

export default function({navigation}) {
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
        <TextInput placeholder="Search..." placeholderTextColor="#aaa" style={styles.searchInput} />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categories}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.categoryBox} />
        ))}
      </View>

      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>Recommended</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Cities')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedScroll}>
        {[...Array(5)].map((_, index) => (
          <Image
            key={index}
            source={require('../../assets/arc.jpg')} // coloque sua imagem aqui
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

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#fff" />
        <Ionicons name="heart-outline" size={24} color="#fff" />
        <Ionicons name="happy-outline" size={24} color="#fff" />
      </View>
    </View>
  );
}