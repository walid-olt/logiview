import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import type { Package, Vehicle, PackageStatus, VehicleStatus } from "@/src/types";

type CardProps =
  | { variant: "package"; data: Package; expanded: boolean; onPress: () => void }
  | { variant: "vehicle"; data: Vehicle; expanded: boolean; onPress: () => void };

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  Disponible: { bg: "#DCFCE7", fg: "#166534" },
  Livré: { bg: "#DCFCE7", fg: "#166534" },
  "En transit": { bg: "#FFEDD5", fg: "#9A3412" },
  "En mission": { bg: "#FFEDD5", fg: "#9A3412" },
};

const StatusBadge = ({ status }: { status: PackageStatus | VehicleStatus }) => {
  const colors = STATUS_COLORS[status] ?? { bg: "#E2E8F0", fg: "#334155" };
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.badgeText, { color: colors.fg }]}>{status}</Text>
    </View>
  );
};

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Card = (props: CardProps) => {
  if (props.variant === "package") {
    const { data, expanded, onPress } = props;
    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{data.reference}</Text>
            <Text style={styles.subtitle}>{data.destination}</Text>
          </View>
          <StatusBadge status={data.status} />
        </View>
        {expanded && (
          <View style={styles.details}>
            <Text style={styles.detailLabel}>Weight</Text>
            <Text style={styles.detailValue}>{data.weightKg} kg</Text>
            <Text style={styles.detailLabel}>Shipped date</Text>
            <Text style={styles.detailValue}>{formatDate(data.shippedDate)}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  const { data, expanded, onPress } = props;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{data.plate}</Text>
          <Text style={styles.subtitle}>{data.type}</Text>
        </View>
        <StatusBadge status={data.status} />
      </View>
      {expanded && (
        <View style={styles.details}>
          <Text style={styles.detailLabel}>Driver</Text>
          <Text style={styles.detailValue}>{data.driver}</Text>
          <Text style={styles.detailLabel}>Mileage</Text>
          <Text style={styles.detailValue}>{data.mileageKm.toLocaleString()} km</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 2,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    marginTop: 12,
    paddingTop: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
    marginTop: 4,
  },
  detailValue: {
    fontSize: 14,
    color: "#0F172A",
    marginTop: 2,
  },
});

export default Card;
