import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface ContainerButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const ContainerButton: React.FC<ContainerButtonProps> = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress} activeOpacity={0.7}>
            <Text style={[textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        height: '10%',
        minHeight: 30,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#fff',
        borderRadius: 50,
    },
});

export default ContainerButton;