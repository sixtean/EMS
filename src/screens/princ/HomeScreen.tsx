import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { loadData, clearData } from "@/src/services/dataStorage";
import Icon from "react-native-vector-icons/Ionicons";
import { HomeScreenProps } from "@/src/types/Types";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


class HomeScreen extends React.Component<HomeScreenProps> {
    state = {
        imageUri: '',
        instrumento: '',
        nome: '',
        nomeInstrumentista: '',
    };

    componentDidMount() {
        this.loadUserData();
    }

    loadUserData = async () => {
        try {
            const userData = await loadData();
            if(userData) {
                this.setState({
                    imageUri: userData.imageUri,
                    instrumento: userData.instrumento,
                    nome: userData.nome,
                    nomeInstrumentista: userData.nomeInstrumentista,
                });
            }
        } catch (error) {
            console.error('Erro ao carregar os dados: ');
        }
    };

    handleClearData = async () => {
        try {
            await clearData();
            this.setState({
                imageUri: '',
                instrumento: '',
                nome: '',
                nomeInstrumentista: '',
            });
        } catch (error) {
            console.error('Erro ao apagar dados: ', error);
        }
    }
    
    render() {
        const { imageUri, nome, nomeInstrumentista } = this.state;  
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                    <Text style={styles.text}> Olá, {nomeInstrumentista} {nome}</Text>
                    <TouchableOpacity
                        style={styles.settingsButton}
                        onPress={() => this.props.navigation.navigate('Settings')}
                    >
                        <Icon name="settings-outline" size={38} color="#fff" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.handleClearData} style={styles.clearButton}>
                    <Text> apagaaaaaaa</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    //Header superior
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: screenHeight * 0.27,
        width: '100%',
        backgroundColor: '#a11a98',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 10,
    },

    image: {
        width: screenWidth * 0.12,
        height: screenHeight * 0.06,
        borderRadius: (screenWidth * 0.3) / 2,
        position: 'absolute',
        top:  screenHeight * 0.07,
        left:  screenWidth * 0.05,
    },

    text: {
        fontSize: screenWidth * 0.049,
        color: '#fff',
        position:  'absolute',
        bottom: screenHeight * 0.03,
        left: screenWidth * 0.05,
        fontFamily: 'Button'
    },

    settingsButton: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 50,
        bottom: screenHeight * 0.05,
        left: screenWidth * 0.39
    },
    //Fim header Superior
    clearButton: {
        marginTop: 20,
        backgroundColor: '#000',
    }
});

export default HomeScreen;