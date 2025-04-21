import React, {useState} from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import BottomNav from "../../components/BottomNav";
import styles from "./style";

const PointDetails = ({ route }) => {
  const { point } = route.params;
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.pageContainer}>
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: point.image_url }} style={styles.image} />
      <View style={styles.headerRow}>
        <Text style={styles.title}>{point.title}</Text>
        <View style={styles.iconButtons}>
        <TouchableOpacity style={styles.iconButton} onPress={toggleLike}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={30}
                color={liked ? "red" : "#fff"} />
            </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome name="comment-o" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <Text style={styles.infoText}>{point.location_lat}</Text>
        <Text style={styles.infoText}>{point.location_long}</Text>
      </View>

      <Text style={styles.description}>{point.description}</Text>

    </ScrollView>

      <BottomNav />
    </View>
  );
};

export default PointDetails;
