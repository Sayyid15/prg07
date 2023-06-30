import {StatusBar} from "expo-status-bar";
import {SafeAreaView, Text, View, StyleSheet, Appearance, Switch} from "react-native"
;

export default function Settings  ({darkMode,setDarkMode})  {
    const switchMode = darkMode ? 'Light Mode': 'Dark Mode'
    return (
        <SafeAreaView >
            <View style={styles.home } >
                {/* Tekst die de huidige modus weergeeft */}
                <Text>{darkMode ? "Light mode" : "Dark mode"}</Text>
                {/* Switch om tussen lichte en donkere modus te switchen */}

                <Switch style={styles.switch }
                    value={darkMode}
                        onValueChange={value=> setDarkMode(value)}
                        thumbColor={darkMode ? '#87CEEB': 'white'}
                        trackColor={{false: 'black', true:'lightgreen'}}
                />
            </View>
            {/* StatusBar om de statusbalk aan te passen op basis van de huidige modus */}
            <StatusBar style={darkMode ? 'light' : 'dark'}/>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
        home: {
            flex: 1,
            backgroundColor: ('#53B88D'),
            alignItems: "center",
            justifyContent: "center"

        },switch:{
            top:40,
        alignItems: "center",
        justifyContent: "center"

    }
    }
)