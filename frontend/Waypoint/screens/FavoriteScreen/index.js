import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BottomNav from '../../components/BottomNav';

const FavoriteScreen = ({navigation}) => {
    const favoritePoints = [
        { id: '1', name: 'Point A' },
        { id: '2', name: 'Point B' },
        { id: '3', name: 'Point C' },
    ];

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Points</Text>
            <FlatList
                data={favoritePoints}
                keyExtractor={(item) => item.id}
                renderItem={renderFavoriteItem}
            />

            <BottomNav navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    itemContainer: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
    },
});

export default FavoriteScreen;