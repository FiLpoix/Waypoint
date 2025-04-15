import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
container: {
        flex: 1,
        backgroundColor: '#1C2025',
        paddingTop: 50,
        paddingHorizontal: 15,
    },
header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
welcome: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
subtitle: {
        color: '#aaa',
        fontSize: 12,
    },
location: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
locationText: {
        color: '#aaa',
        marginLeft: 4,
        fontSize: 12,
    },
searchBar: {
        backgroundColor: '#2D2F3A',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
        height: 40,
    },
searchInput: {
        marginLeft: 8,
        color: '#fff',
        flex: 1,
    },
sectionTitle: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
      },
      categoryBox: {
        alignItems: 'center',
        width: 100,
      },
      categoryImage: {
        width: 75,
        height: 75,
        borderRadius: 50,
        marginBottom: 5,
      },
      categoryText: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
      },
recommendedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
seeAll: {
        color: '#B5838D',
        fontSize: 12,
    },
recommendedScroll: {
        marginTop: 10,
    },
recommendedImage: {
        width: 160,
        height: 120,
        borderRadius: 10,
        marginRight: 15,
    },
addButton: {
        marginTop: 20,
        alignItems: 'center',
    },
addText: {
        color: '#B5838D',
        marginBottom: 10,
    },
plusCircle: {
        backgroundColor: '#2D2F3A',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
plus: {
        color: '#fff',
        fontSize: 24,
    },
bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#2D2F3A',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 20,
    },
});

export default styles