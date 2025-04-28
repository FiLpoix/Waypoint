import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const BottomNav = ({navigation})=>{
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Home")}>
                <Ionicons name="home" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="heart" size={30} color="#fff" onPress={() => navigation.navigate("Favorite")} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Map")}>
                <Ionicons name="map" size={30} color="#fff" />

            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate("Profile")}>
                <Ionicons name="happy" size={30} color="#fff" />

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2D2F3A',
        paddingVertical: 10,
        paddingTop: 30,
    },
    navItem: {
        alignItems: 'center',
        marginBottom: 5,
    },
    navText: {
        color: '#fff',
        fontSize: 12,
    },
});

export default BottomNav;