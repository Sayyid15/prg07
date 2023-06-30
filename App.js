import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
    getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home'
import Maps from './screens/Maps'
import Settings from "./screens/Settings";
import Favorite from "./screens/Favorite";
import Info from "./screens/Info";
import {useState, useEffect} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Thema's voor lichte en donkere modus
const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'turquoise',
        background: 'white',
        text: 'black',
        border: 'black'
    }

}
const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: 'turquoise',
        background: 'black',
        text: 'white',
        border: 'white'
    }

}
export default function App() {
    const [darkMode, setDarkMode] = useState(false)
    const [shopData, setShopData] = useState([])
    const [favorites, setFavorites] = useState([])

    // Functie om favorieten op te halen uit AsyncStorage
    const getFavorites = async () => {
        try {
            const storedData = await AsyncStorage.getItem('favorites');
            if (storedData !== null) {
                setFavorites(JSON.parse(storedData))
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        // Roep getFavorites aan bij het initialiseren van de app
        getFavorites();
    }, []);

    // Functie om favorieten bij te werken
    const updateFavorites = (newFavorites) => {
        setFavorites(newFavorites);
    }

    // Functie om gegevens van externe bron op te halen
    const fetchData = async () => {

        try {
            const response = await fetch('https://stud.hosted.hr.nl/1038640/sportShops.json');
            const json = await response.json();
            setShopData(json.items);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        // Roep fetchData aan bij het initialiseren van de app
        fetchData();
    }, []);

    // Functie om de titel van het tabblad te bepalen  van het huidige scherm

    function getHeader(route) {
        const routeTitle = getFocusedRouteNameFromRoute(route)

        if (routeTitle === 'Info') {
            return 'Info';
        } else {
            return 'Maps'
        }
    }

    return (
        <NavigationContainer theme={darkMode ? darkTheme : lightTheme}>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'Maps') {
                            iconName = focused ? 'map' : 'map-sharp';
                        } else if (route.name === 'Favorite') {
                            iconName = focused ? 'star' : 'star';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'cog' : 'cog-outline';
                        }

                        // Geeft het icoon terug voor de tabnavigator
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: '#87CEEB',
                    tabBarInactiveTintColor: '#96DED1',
                })}
            >
                {/* Scherm voor Home */}
                <Tab.Screen name="Home">

                    {(props) => (<Home
                        {...props}
                        shopData={shopData}
                        fetchData={fetchData}
                        darkMode={darkMode}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        updateFavorites={updateFavorites}
                    />)}
                </Tab.Screen>

                {/* Scherm voor Maps */}
                <Tab.Screen name="Maps" options={({route}) => ({
                    title: getHeader(route),
                    tabBarStyle: {
                        display: route.name === 'Info' ? 'none' : 'flex'
                    },
                    headerShown: false
                })}>
                    {(props) =>
                        (
                            <Stack.Navigator initialRouteName="Maps">
                                <Stack.Screen name="Maps" options={{headerShown: true,}}>
                                    {(props) => (<Maps
                                        {...props}
                                        shopData={shopData}
                                        screenProps={{darkMode}}/>)}

                                </Stack.Screen>
                                <Stack.Screen name="Info"
                                              component={Info}
                                              initialParams={{darkMode}}/>
                            </Stack.Navigator>
                        )}
                </Tab.Screen>

                {/* Scherm voor Favorite */}
                <Tab.Screen name="Favorite">
                    {(props) => (<Favorite
                        {...props}
                        shopData={shopData}
                        darkMode={darkMode}
                        favorites={favorites}
                        updateFavorites={updateFavorites}
                    />)}
                </Tab.Screen>

                {/* Scherm voor Settings */}
                <Tab.Screen name="Settings">
                    {(props) => (<Settings
                        {...props}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}/>)}

                </Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>

    );
}

