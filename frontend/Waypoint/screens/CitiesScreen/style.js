import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C2025',
      paddingTop: 50,
      paddingHorizontal: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      justifyContent: 'space-between',
    },
    searchInput: {
      flex: 1,
      backgroundColor: '#2D2F3A',
      borderRadius: 10, 
      color: '#fff',
      paddingHorizontal: 15,
      marginRight: 10,
      height: 40,
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      backgroundColor: '#2D2F3A',
      borderRadius: 10,
      marginBottom: 15,
      overflow: 'hidden',
    },
    cardImage: {
      width: '100%',
      height: 150,
    },
    cardText: {
      color: '#fff',
      padding: 10,
    },
    cardSubText: {
      color: '#aaa',
      paddingLeft: 10,
      paddingBottom: 10,
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#2D2F3A',
      paddingVertical: 15,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  });

export default styles;