import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#1C2025",
      },
    container: {
        padding: 16,
      },
      image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#fff",
      },
      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      iconButtons: {
        flexDirection: "row",
      },
      iconButton: {
        marginLeft: 12,
      },
      description: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 16,
        paddingTop: 15,
        paddingBottom: 16,
        textAlign: 'center',
        backgroundColor: '#2D2F3A',
        borderRadius: 8,
      },
      infoContainer: {
        marginBottom: 40,
      },
      infoLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#fff",
      },
      infoText: {
        fontSize: 14,
        color: "#fff",
      },
});

export default styles;