import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, FlatList, Pressable, TouchableOpacity, SafeAreaView} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import {useNavigation} from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";


export default function Info({route}) {

    // Ontvang de parameters van de route
    const {item, darkMode} = route.params


    return (


        <SafeAreaView style={[styles.home, darkMode && styles.darkHome]}>
            <View style={styles.info}>

                {/* Titel van de sportwinkel */}
                <View>
                    <Text style={styles.text}>{item.title}</Text>
                </View>

                {/* Beschrijving van de sportwinkel */}
                <View>
                    <Text style={styles.text}>{item.description}</Text>
                </View>

                {/* Website van de sportwinkel */}
                <View>
                    <Text style={styles.text}><Fontisto name="world" size={20}/>{item.website}</Text>
                </View>

                {/* Telefoonnummer van de sportwinkel */}
                <View>
                    <Text style={styles.text}><Fontisto name="phone" size={20}/>{item.phone}</Text>
                </View>

                {/* Straatnaam van de sportwinkel */}
                <View>
                    <Text style={styles.text}><FontAwesome5 name="directions" size={20}/>{item.street}</Text>
                </View>
            </View>


        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
        home: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
        },
        darkHome: {
            backgroundColor: "black"

        }, switch: {
            alignItems: "center",
        },
        info: {

            backgroundColor: "#96DED1",
            padding: 10,
            margin: 5,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            shadowOpacity: 5,
            shadowColor: "turquoise"
        }

        , text: {
            fontSize: 25,
            margin: 20

        }, shop: {
            alignItems: "center",
            justifyContent: "center",
            margin: 5
        }, favorite: {

            alignItems: "center",
            justifyContent: "center",
            shadowOpacity: 2,
            shadowColor: "blue"
        },

    }
)