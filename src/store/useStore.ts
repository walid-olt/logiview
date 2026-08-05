import { create } from "zustand";
import type { Package, Vehicle } from "@/src/types";

export type PackageFilter = Package["status"] | "Tous";

interface DashboardState {
  filter: PackageFilter;
  query: string;
  expandedPackageId: string | null;
  expandedVehicleId: string | null;
  setFilter: (filter: PackageFilter) => void;
  setQuery: (query: string) => void;
  togglePackage: (id: string) => void;
  toggleVehicle: (id: string) => void;
}

export const useStore = create<DashboardState>()((set) => ({
  filter: "Tous",
  query: "",
  expandedPackageId: null,
  expandedVehicleId: null,
  setFilter: (filter) => set({ filter }),
  setQuery: (query) => set({ query }),
  togglePackage: (id) =>
    set((state) => ({
      expandedPackageId: state.expandedPackageId === id ? null : id,
    })),
  toggleVehicle: (id) =>
    set((state) => ({
      expandedVehicleId: state.expandedVehicleId === id ? null : id,
    })),
}));

const includesQuery = (value: string, query: string): boolean => {
  const q = query.trim().toLowerCase();
  return q.length === 0 || value.toLowerCase().includes(q);
};

export const filterPackages = (
  packages: Package[],
  filter: PackageFilter,
  query: string,
): Package[] =>
  packages.filter(
    (pkg) =>
      (filter === "Tous" || pkg.status === filter) &&
      (includesQuery(pkg.reference, query) || includesQuery(pkg.destination, query)),
  );

export const filterVehicles = (vehicles: Vehicle[], query: string): Vehicle[] =>
  vehicles.filter(
    (vehicle) =>
      includesQuery(vehicle.plate, query) || includesQuery(vehicle.type, query),
  );
