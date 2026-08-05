import { Text, StyleSheet } from "react-native";

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 24,
    marginBottom: 12,
  },
});

export default SectionTitle;
