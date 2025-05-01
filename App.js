// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { lightTheme, darkTheme } from './themes/theme';
import Navigation from './navigation/navigation';

export default function App() {
    const systemTheme = useColorScheme();
    const [darkMode, setDarkMode] = useState(systemTheme === 'dark');
    const [shopData, setShopData] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const getFavorites = async () => {
        try {
            const storedData = await AsyncStorage.getItem('favorites');
            if (storedData) {
                setFavorites(JSON.parse(storedData));
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const updateFavorites = async (newFavorites) => {
        setFavorites(newFavorites);
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    const fetchData = async () => {
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
            Alert.alert('Geen internet', 'Er is geen internetverbinding beschikbaar.');
            return;
        }

        try {
            const response = await fetch('https://stud.hosted.hr.nl/1038640/sportShops.json');
            const json = await response.json();
            setShopData(json.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getFavorites();
        fetchData();
    }, []);

    return (
        <NavigationContainer theme={darkMode ? darkTheme : lightTheme}>
            <Navigation
                shopData={shopData}
                fetchData={fetchData}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                favorites={favorites}
                updateFavorites={updateFavorites}
            />
        </NavigationContainer>
    );
}