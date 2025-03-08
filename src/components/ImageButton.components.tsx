import React from "react";
import { TouchableOpacity, ImageBackground,StyleSheet, Text,View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface DadosScreenState {
    imageUri: string | null;
}

class ImagemButton extends React.Component<{}, DadosScreenState> {
    private folderPath: string = FileSystem.documentDirectory + 'userData/';

    constructor(props: {}) {
        super(props);
        this.state = {
            imageUri: null,
        };
    }

    createFolder = async () => {
        const folderInfo = await FileSystem.getInfoAsync(this.folderPath);
        if(!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(this.folderPath, { intermediates: true });
        }
    };

    saveImageUri = async (uri: string) => {
        const filePath = this.folderPath + 'userData.json';
        const data = {
            imageUri: uri,
        };

        await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
            encoding: FileSystem.EncodingType.UTF8,
        });
    };

    pickIMage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                quality: 1,
            });

            if(!result.canceled) {
                const uri = result.assets[0].uri;
                await this.createFolder();
                await this.saveImageUri(uri);
                this.setState({ imageUri: uri });
            } 
        }else{
            alert('Você precisa permitir acesso à galeria!');
        }
    };

    loadImage = async () => {
        const filePath = this.folderPath + 'useData.json';

        try {
            const fileData = await FileSystem.readAsStringAsync(filePath, {
                encoding: FileSystem.EncodingType.UTF8,
            });
            const parsedData = JSON.parse(fileData);
            this.setState({ imageUri: parsedData })
        } catch (error) {
            console.error('Erro ao carregar imagem: ', error);
        }
    };

    componentDidMount() {
        this.loadImage();
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.imageButton}
                onPress={this.pickIMage}
            >
                <ImageBackground
                    source={this.state.imageUri ? { uri: this.state.imageUri }: undefined}
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 30 }}
                >
                    {!this.state.imageUri && <Text>Enviar Foto</Text>}
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    imageButton: {
        backgroundColor: 'transparent',
        borderColor: '#9B4D96',
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 10,
        width: 140,
        height: 180,
        position: 'absolute',
        top: '1%',
        left: '6%',
        overflow: 'hidden',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
});

export default ImagemButton;