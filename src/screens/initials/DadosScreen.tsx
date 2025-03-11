import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, Dimensions, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import UserNameButton from "@/src/components/DadosButtons/UserName";
import ImagemButton from "@/src/components/DadosButtons/ImageButton.components";
import InstrumentoButton from "@/src/components/DadosButtons/Instrumento";
import { saveData, createFolder } from "@/src/services/dataStorage";
import * as FileSystem from 'expo-file-system';
import { DadosScreenProps } from "@/src/types/Types";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;



class DadosScreen extends React.Component<DadosScreenProps> {
    private imageUri: string | null = null;
    private instrumento: string = '';
    private nomeInstrumentista: string = '';
    private nome: string = '';
    state = {
        isFIrstTime: false,
    };


    componentDidMount() {
        this.checkFirstTime();
    }

    checkFirstTime = async () => {
        const folderPath = FileSystem.documentDirectory + 'userData/';
        const path = folderPath + 'userData.json';
        try {
            const fileInfo = await FileSystem.getInfoAsync(folderPath);
            if(!fileInfo.exists) {
                await createFolder();
                const emptyData = JSON.stringify({
                    imageUri: '',
                    instrumento: '',
                    nome: '',
                    nomeInstrumento: '',
                });
                await FileSystem.writeAsStringAsync(path, emptyData);

                this.setState({ isFirstTime: true });
            } else{
                const fileInfo = await FileSystem.getInfoAsync(path);
                if(!fileInfo.exists) {
                    const emptyData = JSON.stringify({
                        imageUri: '',
                        instrumento: '',
                        nome: '',
                        nomeInstrumentista: '',
                    });
                    await FileSystem.writeAsStringAsync(path, emptyData);
                    this.setState({ isFirstTime: true });
                }
                else {
                    const fileContent = await FileSystem.readAsStringAsync(path);
                    const userData = JSON.parse(fileContent);

                    if(userData.imageUri && userData.instrumento && userData.nome && userData.nomeInstrumentista) {
                        this.props.navigation.replace('Home');
                    } else {
                        this.setState({ isFirstTime: true });
                    }
                } 
            }
        } catch (error) {
            console.error('Erro ao verificar userData: ', error);
        }
    };

    handleImageSelect = (uri: string | null) => {
        this.imageUri = uri;
    }
    
    handleNameSelect = (nome: string) => {
        this.nome = nome;
    };

    handleInstrumentosSelect = (instrumento: string, nomeInstrumentista: string) => {
        this.instrumento = instrumento;
        this.nomeInstrumentista = nomeInstrumentista;
    }

    handleSaveData = async () => {
        if (!this.imageUri || !this.nome || !this.instrumento) {
            Alert.alert(
                "Erro",
                "Nenhum campo preenchido, Por favor preencha todos os campos!!!",
                [{ text: "OK" }]
            );
        }else {
            await saveData(this.imageUri, this.instrumento, this.nome, this.nomeInstrumentista);

            const path = FileSystem.documentDirectory + 'userData/userData.json';
            const userData = {
                imageUri: this.imageUri,
                instrumento: this.instrumento,
                nome: this.nome,
                nomeInstrumentista: this.nomeInstrumentista,
            };

            try {
                await FileSystem.writeAsStringAsync(path, JSON.stringify(userData));
                this.props.navigation.replace('Home');
            } catch (error) {
                console.error('Erro ao salvar o arquivo userData.json: ', error);
            }
        }
    }

    render() {
        if (this.state.isFIrstTime) {
            return null;
        }
        return (
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <LinearGradient
                        colors={['#86027de2', '#04308fed']}
                        style={styles.gradient}
                    >
                        <View style={[styles.innerContainer, { minHeight: screenHeight }]}>
                            <ImagemButton onImageSelect={this.handleImageSelect}/>
                            <UserNameButton onUserInfoSelect={this.handleNameSelect}/>
                            <InstrumentoButton onInstrumentoSelect={this.handleInstrumentosSelect} />
                            <TouchableOpacity onPress={this.handleSaveData} style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Salvar Dados</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'transparent',
        flex: 1,
    },

    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    saveButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: screenHeight * 0.9,
        paddingVertical: screenHeight * 0.02,
        paddingHorizontal: screenWidth * 0.1,
        width: screenWidth * 0.6
    },
    saveButtonText: {
        color: '#000',
        fontSize: screenHeight * 0.022,
        fontFamily: 'Button',
        textAlign: 'center',
    }
});

export default DadosScreen;