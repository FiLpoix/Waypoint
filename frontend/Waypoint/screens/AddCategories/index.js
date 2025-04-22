import React, { useState } from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity, Image, StyleSheet, ScrollView, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';
import baseStyles from '../HomeScreen/style';

export default function AddCategoryScreen({ navigation }) {
  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');

  const handleAddCategory = async () => {
    if (!category || !icon || !name) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem.');
      return;
    }

    try {
      await api.post('/categories/', {
        tipo: category,
        icon_url: icon,
        name: name,
      });

      Alert.alert('Sucesso', `Categoria "${category}" adicionada com sucesso!`);
      setCategory('');
      setIcon('');
      setName('');
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível adicionar a categoria.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos da permissão para acessar a galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeImages,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIcon(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={baseStyles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={[baseStyles.sectionTitle, styles.title]}>Adicionar Nova Categoria</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione uma categoria..." value="" />
          <Picker.Item label="Natureza" value="natureza" />
          <Picker.Item label="Festival" value="festival" />
          <Picker.Item label="Arquitetônico" value="arquitetonico" />
        </Picker>
      </View>

      <TouchableOpacity onPress={pickImage} style={baseStyles.addCategoryBox}>
        {icon ? (
          <Image source={{ uri: icon }} style={styles.imagePreview} />
        ) : (
          <Text style={{ color: '#fff' }}>Selecionar Imagem</Text>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Nome da Categoria"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
        style={[baseStyles.searchBar, baseStyles.searchInput, { marginTop: 20 }]}
      />

      <TouchableOpacity style={baseStyles.addButton} onPress={handleAddCategory}>
        <Text style={baseStyles.addText}>Adicionar Categoria</Text>
        <View style={baseStyles.plusCircle}>
          <Text style={baseStyles.plus}>+</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#2D2F3A',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
  },
  imagePreview: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
});
