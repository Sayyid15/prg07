import {StatusBar} from "expo-status-bar";
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native"
import React, {useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";


export default function Home  ({ darkMode,shopData,updateFavorites,fetchData,navigation})  {
const [refresh, setRefresh]=useState(false);
const [favorites, setFavorites]=useState([]);

const favoritePress=(item)=>{

    if(myFavorite(item)){

        deleteFavorites(item);
    }else {

        addFavorites(item);
    }
};

    // Controleert of een item al favoriet is
const myFavorite=(item)=>{
    return favorites.some((fav)=> fav.title === item.title);
}

    // Voegt een item toe aan favorieten
const addFavorites= async(item)=>{
    const updatedFavorites=[...favorites,item];

    setFavorites(updatedFavorites)

    await AsyncStorage.setItem('favorites',JSON.stringify(updatedFavorites));

    updateFavorites(updatedFavorites)
}

    // Verwijdert een item uit favorieten
    const deleteFavorites= async(item)=>{
        const updatedFavorites=favorites.filter(fav=> fav.title !== item.title);


        setFavorites(updatedFavorites)

        await AsyncStorage.setItem('favorites',JSON.stringify(updatedFavorites));

        updateFavorites(updatedFavorites)
    }

    // Handler voor het vernieuwen van de gegevens
    const refreshHandler=()=>{
    setRefresh(true);

    fetchData().then(()=>{
        setRefresh(false);
    })
    }

    // Haalt de lijst met favorieten op uit AsyncStorage
    const fetchFavorites = async () => {
        try {
            const storedData = JSON.parse(await AsyncStorage.getItem("favorites"))
            if (storedData) {
                setFavorites(JSON.parse(storedData))
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
   fetchFavorites();
})
    const pressShop = (item) => {
        navigation.navigate("Maps", {longitude: item.longitude, latitude: item.latitude})
    }





    return (
        <SafeAreaView style={[styles.home ,darkMode && styles.darkHome]}>
            {/* Lijst met sportwinkels */}
            <FlatList
                data={shopData}
                renderItem={({item}) =>
                    (
                        <View style={styles.shop}>
                            <TouchableOpacity
                                onPress={() => pressShop({longitude: item.longitude, latitude: item.latitude})}

                            >
                                {/* Tekst van de sportwinkel */}
                                <Text style={styles.text} >{item.title}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => favoritePress(item)}

                            >
                                <AntDesign name={myFavorite(item) ? 'star' :'staro'} size={50} />
                            </TouchableOpacity>



                        </View>
                    )
                }
                keyExtractor={(item) => item.title}
                refreshing={refresh}
                onRefresh={refreshHandler}


            />

<StatusBar style='auto'/>
</SafeAreaView>
)
}


const styles = StyleSheet.create({
        home: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:"white"
        },
    darkHome:{
        backgroundColor:"black"

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
    favorite:{
marginLeft:250,
    },
        text: {
            fontSize: 30
        },

    }
)