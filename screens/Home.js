import { StatusBar } from "expo-status-bar";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Home({ darkMode, shopData, updateFavorites, fetchData, navigation }) {
    const [refresh, setRefresh] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const favoritePress = (item) => {
        if (myFavorite(item)) {
            deleteFavorites(item);
        } else {
            addFavorites(item);
        }
    };

    const myFavorite = (item) => {
        return favorites.some((fav) => fav.title === item.title);
    };

    const addFavorites = async (item) => {
        const updatedFavorites = [...favorites, item];
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        updateFavorites(updatedFavorites);
    };

    const deleteFavorites = async (item) => {
        const updatedFavorites = favorites.filter(fav => fav.title !== item.title);
        setFavorites(updatedFavorites);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        updateFavorites(updatedFavorites);
    };

    const refreshHandler = () => {
        setRefresh(true);
        fetchData().then(() => {
            setRefresh(false);
        });
    };

    const fetchFavorites = async () => {
        try {
            const storedData = JSON.parse(await AsyncStorage.getItem("favorites"));
            if (storedData) {
                setFavorites(storedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const pressShop = (item) => {
        navigation.navigate("Maps", { longitude: item.longitude, latitude: item.latitude });
    };

    return (
        <SafeAreaView style={[styles.home, darkMode && styles.darkHome]}>
            <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 20, alignItems: 'center' }}
                data={shopData}
                renderItem={({ item }) => (
                    <View style={styles.shop}>
                        <TouchableOpacity onPress={() => pressShop({ longitude: item.longitude, latitude: item.latitude })}>
                            <Text style={styles.text}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => favoritePress(item)}>
                            <AntDesign name={myFavorite(item) ? 'star' : 'staro'} size={50} />
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.title}
                refreshing={refresh}
                onRefresh={refreshHandler}
            />
            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 10,
    },
    darkHome: {
        backgroundColor: "black"
    },
    shop: {
        backgroundColor: "#87CEEB",
        padding: 5,
        width: 350,
        height: 100,
        margin: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 30
    },
});
