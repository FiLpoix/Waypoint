import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1C2025',
      padding: 20,
      paddingTop: 80,
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 20,
    },
    title: {
      color: '#B5838D',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    label: {
      color: '#fff',
      marginTop: 20,
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#2D2F3A',
      borderRadius: 10,
      padding: 12,
      color: '#fff',
    },
    signInText: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    registerButton: {
      backgroundColor: '#2D2F3A',
      padding: 15,
      marginTop: 30,
      borderRadius: 10,
      alignItems: 'center',
    },
    registerText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default styles;