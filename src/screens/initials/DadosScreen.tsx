import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import ImagemButton from "@/src/components/ImageButton.components";

const DadosScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <ImagemButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9B4D96',
        padding: 20,
    },
    buttonContainer: {
        width: '95%',
        height: '93%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        top: '2%',
        borderRadius: 40,

    },
});

export default DadosScreen;