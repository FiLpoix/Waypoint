import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#1C2025',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderColor: '#2D2F3A',
      backgroundColor: '#2D2F3A',
      color: '#fff',
      borderWidth: 1,
      borderRadius: 10,
      padding: 12,
      marginVertical: 20,
      textAlignVertical: 'top',
    },
    button: {
      backgroundColor: '#B5838D',
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

export default styles;