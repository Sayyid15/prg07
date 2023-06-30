import {SafeAreaView, View, StyleSheet} from "react-native"
import MapView, {Marker} from "react-native-maps";
import React, {useState, useEffect, useContext} from "react";
import * as Location from "expo-location";
import {useNavigation} from "@react-navigation/native";


export default function Maps({shopData,darkMode}) {
    const [liveLocation, setLiveLocation] = useState(null);
    const navigation = useNavigation();

    // Functie om naar het Info-scherm te navigeren wanneer op een marker wordt geklikt

    const pressMarker = (item) => {
        navigation.navigate("Info", {item: item})
    }

    // Functie om de huidige locatie op te halen

    const getLocation = async () => {
        try {
            const {status} = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                return
            }
            const location = await Location.getCurrentPositionAsync({})
            setLiveLocation(location.coords);
        } catch
            (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        // Roep getLocation aan bij het initialiseren van het component

        getLocation()

    }, []);

    const [region, setRegion] = useState({
        latitude: liveLocation ? liveLocation.latitude : 51.926517,
        longitude: liveLocation ? liveLocation.longitude : 4.462456,
        latitudeDelta: 0.0800,
        longitudeDelta: 0.180
    })
    return (
        <SafeAreaView>
            <View style={styles.container}>

                {/* Kaartweergave */}

                <MapView style={[styles.map, darkMode && styles.darkHome]}
                         initialRegion={region}
                         onRegionChangeComplete={setRegion}
                         showsUserLocation={true}
                >
                    {/* Markers voor sportwinkels */}

                    {shopData.map((item) =>{
                        return(

                            <Marker
                                key={item.title}
                                pinColor="#00FFFF"
                                coordinate={{longitude: item.longitude, latitude: item.latitude}}
                                title={item.title}
                                onPress={() => pressMarker(item)}
                            />
                        )})
                    }
                </MapView>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
        map: {
            width: '100%',
            height: '100%',
        }
    }
)