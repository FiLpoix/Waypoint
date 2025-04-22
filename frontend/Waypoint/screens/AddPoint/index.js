import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import api from '../../services/api';
import baseStyles from '../HomeScreen/style'; // importa o style base que você mandou

const AddPointScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLong, setLocationLong] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [cityId, setCityId] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, cityRes] = await Promise.all([
          api.get('/categories'),
          api.get('/cities'),
        ]);
        setCategories(catRes.data);
        setCities(cityRes.data);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao carregar categorias ou cidades.');
      }
    };
    fetchData();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso às suas imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeImages,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddPoint = async () => {
    if (!title || !description || !locationLat || !locationLong || !categoryId || !cityId || !image) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }

    try {
      await api.post('/tourist_points/', {
        title,
        description,
        location_lat: locationLat,
        location_long: locationLong,
        category_id: categoryId,
        city_id: cityId,
        image_url: image,
      });

      Alert.alert('Sucesso', 'Ponto turístico adicionado com sucesso!');
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível adicionar o ponto turístico.');
    }
  };

  return (
    <ScrollView style={baseStyles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={[baseStyles.sectionTitle, styles.title]}>Adicionar Ponto Turístico</Text>

      <TextInput
        style={[baseStyles.searchBar, baseStyles.searchInput]}
        placeholder="Título"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[baseStyles.searchBar, baseStyles.searchInput]}
        placeholder="Descrição"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={[baseStyles.searchBar, baseStyles.searchInput]}
        placeholder="Latitude"
        placeholderTextColor="#aaa"
        value={locationLat}
        onChangeText={setLocationLat}
        keyboardType="numeric"
      />
      <TextInput
        style={[baseStyles.searchBar, baseStyles.searchInput]}
        placeholder="Longitude"
        placeholderTextColor="#aaa"
        value={locationLong}
        onChangeText={setLocationLong}
        keyboardType="numeric"
      />

      <Text style={baseStyles.sectionTitle}>Categoria</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categoryId}
          onValueChange={(itemValue) => setCategoryId(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione uma categoria..." value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.tipo} value={cat.id} />
          ))}
        </Picker>
      </View>

      <Text style={baseStyles.sectionTitle}>Cidade</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cityId}
          onValueChange={(itemValue) => setCityId(itemValue)}
          style={styles.picker}
          dropdownIconColor="#fff"
        >
          <Picker.Item label="Selecione uma cidade..." value="" />
          {cities.map((city) => (
            <Picker.Item key={city.id} label={city.nome} value={city.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={baseStyles.addCategoryBox} onPress={pickImage}>
        <Text style={{ color: '#fff' }}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}

      <TouchableOpacity style={baseStyles.addButton} onPress={handleAddPoint}>
        <Text style={baseStyles.addText}>Adicionar Ponto Turístico</Text>
        <View style={baseStyles.plusCircle}>
          <Text style={baseStyles.plus}>+</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

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
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default AddPointScreen;
