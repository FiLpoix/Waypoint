import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const BottomNav = ({navigation})=>{
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="home" size={24} color="#fff" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="heart" size={24} color="#fff" />
                <Text style={styles.navText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
                <Ionicons name="happy" size={24} color="#fff" />
                <Text style={styles.navText}>Profile</Text>
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
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: '#fff',
        fontSize: 12,
    },
});

export default BottomNav;