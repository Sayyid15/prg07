import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Maps from '../screens/Maps';
import Favorite from '../screens/Favorite';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = ({ shopData, fetchData, darkMode, setDarkMode, favorites, updateFavorites }) => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home-outline';
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Maps':
                            iconName = focused ? 'map' : 'map-sharp';
                            break;
                        case 'Favorite':
                            iconName = focused ? 'star' : 'star-outline';
                            break;
                        case 'Settings':
                            iconName = focused ? 'cog' : 'cog-outline';
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#87CEEB',
                tabBarInactiveTintColor: '#96DED1',
            })}
        >
            <Tab.Screen name="Home">
                {(props) => (
                    <Home
                        {...props}
                        shopData={shopData}
                        fetchData={fetchData}
                        darkMode={darkMode}
                        favorites={favorites}
                        updateFavorites={updateFavorites}
                    />
                )}
            </Tab.Screen>
            <Tab.Screen name="Maps">
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="Maps">
                            {(props) => <Maps {...props} shopData={shopData} darkMode={darkMode} />}
                        </Stack.Screen>
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen name="Favorite">
                {(props) => <Favorite {...props} favorites={favorites} darkMode={darkMode} />}
            </Tab.Screen>
            <Tab.Screen name="Settings">
                {(props) => <Settings {...props} darkMode={darkMode} setDarkMode={setDarkMode} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default Navigation;
