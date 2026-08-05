import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface FilterButtonProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const FilterButton = ({ label, active, onPress }: FilterButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.buttonActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 12,
  },
  buttonActive: {
    backgroundColor: "#2563EB",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  labelActive: {
    color: "#FFFFFF",
  },
});

export default FilterButton;
