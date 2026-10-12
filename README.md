<p align="center">
  <img src="assets/sportLocator.png" alt="sportLocator app icon" width="120">
</p>

# sportLocator

A mobile app for finding sports shops in Rotterdam, built with React Native and Expo as a school project for the PRG07 course at Hogeschool Rotterdam.

## Features

- **Shop list**: browse all sports shops in a scrollable list. Pull down to refresh the data.
- **Map**: see every shop as a marker on a map of Rotterdam, together with your own location (if you allow location access).
- **Favorites**: tap the star next to a shop to save it to the Favorite tab. Favorites are stored on the device, so they are kept after closing the app.
- **Dark mode**: switch between light and dark mode in Settings.
- **Offline check**: shows an alert when there is no internet connection.

## Tech stack

- [Expo](https://expo.dev/) SDK 57 (React Native 0.86, React 19)
- [React Navigation](https://reactnavigation.org/) 7 (bottom tabs and stack)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps) and [expo-location](https://docs.expo.dev/versions/latest/sdk/location/) for the map and your location
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) for saving favorites
- [NetInfo](https://github.com/react-native-netinfo/react-native-netinfo) for the connectivity check
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/) for icons

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 22.13 or newer (an LTS release is recommended)
- The [Expo Go](https://expo.dev/go) app on your phone, or an iOS Simulator / Android emulator

### Installation

```bash
git clone https://github.com/Sayyid15/prg07.git
cd prg07
npm install
```

### Running the app

```bash
npm start
```

This starts the Expo development server. Then open the app:

- **On your phone**: scan the QR code with Expo Go (Android) or the Camera app (iOS).
- **iOS Simulator**: press `i` in the terminal, or run `npm run ios`.
- **Android emulator**: press `a` in the terminal, or run `npm run android`.

The app needs an internet connection to load the shop data.

## Project structure

```
├── App.js                  # Root component: theme, data fetching and favorites state
├── navigation/
│   └── navigation.js       # Bottom tab navigator (Home, Maps, Favorite, Settings)
├── screens/
│   ├── Home.js             # Shop list with favorite toggle and pull-to-refresh
│   ├── Maps.js             # Map with shop markers and your location
│   ├── Favorite.js         # List of favorite shops
│   ├── Settings.js         # Light/dark mode switch
│   └── Info.js             # Shop details (not linked in the navigation yet)
├── themes/
│   └── theme.js            # Light and dark navigation themes
├── database/
│   └── database.js         # SQLite helpers for saving routes (not used yet)
└── assets/                 # App icon, splash screen and favicon
```

## Data

The shop data is loaded from a JSON file hosted at
[`https://stud.hosted.hr.nl/1038640/sportShops.json`](https://stud.hosted.hr.nl/1038640/sportShops.json).
Each shop includes a title, description, website, phone number, street address and coordinates.

## Dependency notes

`package.json` contains an `overrides` entry that makes the `xcode` package (part of Expo's build tooling) use `uuid` 11.1.1 or newer, which fixes [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq). It can be removed once Expo depends on an `xcode` release that no longer uses `uuid` 7.
