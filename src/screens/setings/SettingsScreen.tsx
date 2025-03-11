import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Configuração</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    }, 

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    }
});

export default SettingsScreen;