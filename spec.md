# LogiView — Technical Spec

## Overview

**LogiView** is a single-screen React Native (Expo) mobile app that gives a transport company's team a quick dashboard view of their operations: packages currently in transit and available fleet vehicles.

**Goal:** learn Expo/React Native fundamentals — not build a full logistics system.

**Scope constraints:**

- Single screen, no navigation
- No API calls, no database — static local data only
- TypeScript only, no `any`, no external UI libraries

---

## Stack & Constraints

| Constraint       | Rule                                                                                                            |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| Language         | TypeScript everywhere, no `.js` files, no `any`                                                                 |
| UI               | Native RN components only (`View`, `Text`, `Image`, `ScrollView`, `TouchableOpacity`, `TextInput`) — no UI libs |
| Styling          | `StyleSheet.create` only; inline styles only if justified case-by-case                                          |
| Layout           | Flexbox throughout; no absolute positioning unless justified                                                    |
| State            | Local `useState` only                                                                                           |
| Data             | Static, typed, in `data/data.ts` — no network, no DB                                                            |
| Folder structure | `components/`, `data/`, `types/`                                                                                |

---

## Folder Structure

```
src/
├── components/
│   ├── Card.tsx
│   ├── FilterButton.tsx
│   ├── SearchBar.tsx
│   └── SectionTitle.tsx
├── data/
│   └── data.ts
├── types/
│   └── index.ts
└── App.tsx
```

---

## Data Models

```ts
// types/index.ts
export type PackageStatus = "En transit" | "Livré";
export type VehicleStatus = "Disponible" | "En mission";

export interface Package {
  id: string;
  reference: string;
  destination: string;
  status: PackageStatus;
  weightKg: number;
  shippedDate: string; // ISO date
}

export interface Vehicle {
  id: string;
  plate: string;
  type: string;
  status: VehicleStatus;
  driver: string;
  mileageKm: number;
}
```

> Statuses are kept in French (`"En transit"`, `"Livré"`, `"Disponible"`, `"En mission"`) to match the source brief — rename freely if the app's UI language changes.

---

## Layout

```
Header (fixed)
  └─ "LogiView" + subtitle
ScrollView (flex: 1)
  ├─ SearchBar
  ├─ SectionTitle "Colis en cours"
  ├─ FilterButton row (Tous / En transit / Livré)
  ├─ Card[] (packages)
  ├─ SectionTitle "Véhicules disponibles"
  └─ Card[] (vehicles)
```

---

## Task Breakdown

### T1 — Static Dashboard (base layer)

- [ ] Build fixed `Header` with app name "LogiView" + short subtitle
- [ ] Wrap body content in a single `ScrollView`
- [ ] Build `SectionTitle` component (props: `title: string`)
- [ ] Build `Card` component, generic enough to render either a package or a vehicle:
  - Package view: reference, destination, status badge
  - Vehicle view: plate, type, status badge
  - Suggested prop shape: `variant: "package" | "vehicle"` + `data: Package | Vehicle`
- [ ] Populate `data/data.ts` with static arrays (min. ~5 packages, ~5 vehicles)
- [ ] Render "Colis en cours" and "Véhicules disponibles" sections using `Card`

**Acceptance:** app renders both sections from static data, no console errors, no `any`.

---

### T2 — Status Filter (packages only)

- [ ] Build `FilterButton` component (props: `label: string`, `active: boolean`, `onPress: () => void`)
- [ ] Render 3 filter buttons: **Tous / En transit / Livré**
- [ ] Track active filter in `useState<PackageStatus | "Tous">`
- [ ] Apply filter to the **packages list only** — vehicles section untouched
- [ ] Visually highlight the active button (background/border/text color change)

**Acceptance:** switching filters updates only the packages section; active state is visually obvious.

---

### T3 — Search (packages + vehicles)

- [ ] Build `SearchBar` component wrapping `TextInput` (props: `value: string`, `onChangeText: (t: string) => void`)
- [ ] Track query in `useState<string>`
- [ ] Filter packages by `reference` OR `destination` (case-insensitive substring match)
- [ ] Filter vehicles by `plate` OR `type` (case-insensitive substring match)
- [ ] Search must combine (AND) with the active status filter from T2
- [ ] Show an empty-state message per section when no results match

**Acceptance:** typing filters both sections live; combining search + filter narrows correctly; empty state shows when appropriate.

---

### T4 — Expandable Card Detail

- [ ] Add `expanded: boolean` state to `Card` (or lift to parent — see note below)
- [ ] On `onPress`, toggle expansion to reveal:
  - Package: weight (`weightKg`), shipped date (`shippedDate`)
  - Vehicle: driver (`driver`), mileage (`mileageKm`)
- [ ] Tapping an expanded card again collapses it back to initial state
- [ ] **Decide and enforce:** only one card expanded per section at a time (recommended for a cleaner UX and simpler state management), OR allow multiple simultaneously expanded — pick based on team skill level and document the choice

**Acceptance:** tap expands with extra info, tap again collapses; expansion state doesn't leak between sections; no layout jank (use `LayoutAnimation` or simple conditional rendering — no external animation lib required unless justified).

> **Implementation note on "one card at a time":** if you go with this constraint, store the expanded item's `id` at the section (parent) level (`expandedPackageId: string | null`) rather than inside each `Card`, so opening one card can programmatically close the others.

---

## Styling Guidelines

- Status color coding (consistent across both sections):
  - 🟢 Green → `Disponible`, `Livré`
  - 🟠 Orange → `En transit`, `En mission`
- All styles via `StyleSheet.create` at the bottom of each component file
- Design for a standard phone screen — comfortable touch targets (min ~44px height for buttons/cards), readable font sizes, adequate spacing between cards

---

## Definition of Done

- [ ] All 4 tasks (T1–T4) implemented and manually tested on device/simulator
- [ ] No `any` types, no `.js` files, no external UI libraries
- [ ] All styling via `StyleSheet.create`
- [ ] Folder structure matches `components/`, `data/`, `types/`
- [ ] App runs cleanly via `expo start` with no TypeScript errors
