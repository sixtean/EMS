import React from "react";
import { TextInput, StyleSheet, View, Dimensions } from "react-native";

const { width, height} = Dimensions.get('window');

interface UserNameButtonProps {
    onUserInfoSelect: (name: string) => void;
}

interface UserNameButtonState {
    name: string;
}

class UserNameButton extends React.Component<UserNameButtonProps, UserNameButtonState> {
    constructor(props: UserNameButtonProps) {
        super(props);
        this.state = {
            name: "",
        };
    }

    handleNameChange = (text: string) => {
        this.setState({ name: text }, () => {
            this.props.onUserInfoSelect(this.state.name);
        });
    }

    render() {
        const { name } = this.state;
        const nameTextColor = name ? '#34D399' : '#5c5c5ced';

        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, {color: nameTextColor}]}
                    placeholder="Nome e Sobrenome:"
                    value={this.state.name}
                    onChangeText={this.handleNameChange}
                    placeholderTextColor="#5c5c5ced"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: height * 0.32,
        right: width * 0.05,
    },
    input: {
        width: width * 0.9,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 18,
        fontFamily: 'Error',
    },
});

export default UserNameButton;

