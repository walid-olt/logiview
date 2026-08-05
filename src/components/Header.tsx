import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>LogiView</Text>
      <Text style={styles.sub}>Your operations, all in one place.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F172A",
    paddingTop: 64,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  sub: {
    fontSize: 14,
    color: "#CBD5E1",
    marginTop: 4,
  },
});

export default Header;
