import React, {useEffect, useState} from 'react';
import { View, Text, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from './style';
import api from '../../services/api';

const data = [
  { name: 'Coliseum', image: require('../../assets/coliseum.jpg') },
  { name: 'Castle', image: require('../../assets/castle.jpg') },
  { name: 'Louvre', image: require('../../assets/louvre.jpg') },
  { name: 'BigBang', image: require('../../assets/bigbang.jpg') },
];

export default function({navigation}) {

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" placeholderTextColor="#999" style={styles.searchInput} />
        <Ionicons name="menu" size={24} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {data.map((item, index) => (
          <View style={styles.card} key={index}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.name}</Text>
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