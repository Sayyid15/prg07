// Favorite.js
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = ({ darkMode, favorites }) => {
    return (
        <SafeAreaView style={[styles.home, darkMode && styles.darkHome]}>
            <FlatList
                data={favorites}
                renderItem={({ item }) => (
                    <View style={styles.shop}>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.title}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    darkHome: {
        backgroundColor: 'black',
    },
    shop: {
        backgroundColor: '#87CEEB',
        padding: 5,
        width: 350,
        height: 100,
        margin: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
    },
});

export default Favorite;
