import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1C2025',
        paddingHorizontal: 16,
        paddingTop: 20,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
      },
      categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 8,
      },
      recommendedImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 8,
      },
      pointItem: {
        marginBottom: 20,
      },
})

export default styles;