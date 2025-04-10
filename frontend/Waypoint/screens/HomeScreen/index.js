import React from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

export default function(){
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, User!</Text>
      <Text style={styles.subGreeting}>Explore new locations!</Text>

      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={16} color="#aaa" />
        <Text style={styles.locationText}>Teresina, Piauí</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#666"
      />

      <Text style={styles.sectionTitle}>Categories</Text>
      <View style={styles.categoriesContainer}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.categoryBox} />
        ))}
      </View>

      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>Recommended</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        {[...Array(2)].map((_, index) => (
          <Image
            key={index}
            style={styles.image}
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Arc_de_Triomphe%2C_Paris_21_October_2010.jpg' }}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addText}>Adicione um ponto turístico!!</Text>
        <Ionicons name="add-circle-outline" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.navbar}>
        <Ionicons name="home-outline" size={28} color="white" />
        <Ionicons name="heart-outline" size={28} color="white" />
        <Ionicons name="happy-outline" size={28} color="white" />
      </View>
    </View>
  );
};
