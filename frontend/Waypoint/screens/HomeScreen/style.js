import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F1115',
        padding: 20,
    },
    greeting: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }, subGreeting: {
        color: 'gray',
        fontSize: 14,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        color: '#ccc',
        marginLeft: 5,
    },
    searchBar: {
        backgroundColor: '#1C1E22',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        color: 'white',
    },
    sectionTitle: {
        color: 'white',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryBox: {
        width: 50,
        height: 50,
        backgroundColor: '#1C1E22',
        borderRadius: 10,
    },
    recommendedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeAllText: {
        color: '#aaa',
        fontSize: 12,
    },
    image: {
        width: 150,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
    },
    addButton: {
        marginTop: 20,
        backgroundColor: '#1C1E22',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        color: '#F66',
        marginRight: 8,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#1C1E22',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});

export default styles