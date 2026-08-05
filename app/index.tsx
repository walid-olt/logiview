import { useMemo } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { PACKAGES, VEHICLES } from "@/src/data/data";
import Header from "@/src/components/Header";
import SearchBar from "@/src/components/SearchBar";
import SectionTitle from "@/src/components/SectionTitle";
import FilterButton from "@/src/components/FilterButton";
import Card from "@/src/components/Card";
import {
  useStore,
  filterPackages,
  filterVehicles,
  type PackageFilter,
} from "@/src/store/useStore";

const FILTER_OPTIONS: PackageFilter[] = ["Tous", "En transit", "Livré"];

export default function Index() {
  const filter = useStore((s) => s.filter);
  const query = useStore((s) => s.query);
  const expandedPackageId = useStore((s) => s.expandedPackageId);
  const expandedVehicleId = useStore((s) => s.expandedVehicleId);
  const setFilter = useStore((s) => s.setFilter);
  const setQuery = useStore((s) => s.setQuery);
  const togglePackage = useStore((s) => s.togglePackage);
  const toggleVehicle = useStore((s) => s.toggleVehicle);
  const packages = useMemo(() => filterPackages(PACKAGES, filter, query), [filter, query]);
  const vehicles = useMemo(() => filterVehicles(VEHICLES, query), [query]);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <SearchBar value={query} onChangeText={setQuery} />

        <SectionTitle title="Colis en cours" />
        <View style={styles.filters}>
          {FILTER_OPTIONS.map((option) => (
            <FilterButton
              key={option}
              label={option}
              active={filter === option}
              onPress={() => setFilter(option)}
            />
          ))}
        </View>
        {packages.length === 0 ? (
          <Text style={styles.empty}>No packages match your search.</Text>
        ) : (
          packages.map((pkg) => (
            <Card
              key={pkg.id}
              variant="package"
              data={pkg}
              expanded={expandedPackageId === pkg.id}
              onPress={() => togglePackage(pkg.id)}
            />
          ))
        )}

        <SectionTitle title="Véhicules disponibles" />
        {vehicles.length === 0 ? (
          <Text style={styles.empty}>No vehicles match your search.</Text>
        ) : (
          vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              variant="vehicle"
              data={vehicle}
              expanded={expandedVehicleId === vehicle.id}
              onPress={() => toggleVehicle(vehicle.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  filters: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  empty: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    paddingVertical: 24,
  },
});
