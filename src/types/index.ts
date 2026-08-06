export type PackageStatus = "En transit" | "Livré";
export type VehicleStatus = "Disponible" | "En mission";

export interface Package {
  id: string;
  reference: string;
  destination: string;
  status: PackageStatus;
  weightKg: number;
  shippedDate: Date;
}

export interface Vehicle {
  id: string;
  plate: string;
  type: string;
  status: VehicleStatus;
  driver: string;
  mileageKm: number;
}
