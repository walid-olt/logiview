import { View, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({ value, onChangeText }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Search reference, destination, plate or type"
        placeholderTextColor="#94A3B8"
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  input: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#0F172A",
  },
});

export default SearchBar;
