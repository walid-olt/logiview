import type { Package, Vehicle } from "@/src/types";

export const PACKAGES: Package[] = [
  {
    id: "pkg-1",
    reference: "COL-2026-0147",
    destination: "Lyon",
    status: "En transit",
    weightKg: 18.5,
    shippedDate: new Date("2026-08-01"),
  },
  {
    id: "pkg-2",
    reference: "COL-2026-0148",
    destination: "Marseille",
    status: "En transit",
    weightKg: 42.0,
    shippedDate: new Date("2026-08-02"),
  },
  {
    id: "pkg-3",
    reference: "COL-2026-0149",
    destination: "Bordeaux",
    status: "Livré",
    weightKg: 7.2,
    shippedDate: new Date("2026-07-29"),
  },
  {
    id: "pkg-4",
    reference: "COL-2026-0150",
    destination: "Nantes",
    status: "En transit",
    weightKg: 25.8,
    shippedDate: new Date("2026-08-03"),
  },
  {
    id: "pkg-5",
    reference: "COL-2026-0151",
    destination: "Lille",
    status: "Livré",
    weightKg: 11.0,
    shippedDate: new Date("2026-07-30"),
  },
];

export const VEHICLES: Vehicle[] = [
  {
    id: "veh-1",
    plate: "AB-482-CD",
    type: "Camion frigorifique",
    status: "Disponible",
    driver: "Jean Dupont",
    mileageKm: 125430,
  },
  {
    id: "veh-2",
    plate: "EF-315-GH",
    type: "Camion benne",
    status: "En mission",
    driver: "Sofia Martin",
    mileageKm: 89210,
  },
  {
    id: "veh-3",
    plate: "IJ-907-KL",
    type: "Fourgon",
    status: "Disponible",
    driver: "Karim Benali",
    mileageKm: 45320,
  },
  {
    id: "veh-4",
    plate: "MN-664-OP",
    type: "Camion citerne",
    status: "En mission",
    driver: "Lucie Bernard",
    mileageKm: 214780,
  },
  {
    id: "veh-5",
    plate: "QR-120-ST",
    type: "Fourgon",
    status: "Disponible",
    driver: "Paul Lefèvre",
    mileageKm: 61205,
  },
];
