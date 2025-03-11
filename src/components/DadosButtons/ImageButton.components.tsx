import React from "react";
import { TouchableOpacity, ImageBackground,StyleSheet, Text, View, Dimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { saveData, loadData } from "@/src/services/dataStorage";

const { width, height } = Dimensions.get('window');
interface ImageButtonProps {
    onImageSelect: (imageUri: string) => void;
}

interface DadosScreenState {
    imageUri: string | null;
}

class ImagemButton extends React.Component<ImageButtonProps, DadosScreenState> {
    constructor(props: ImageButtonProps) {
        super(props);
        this.state = {
            imageUri: null,
        };
    }

    pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permissionResult.granted) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                quality: 1,
            });

            if(!result.canceled) {
                const uri = result.assets[0].uri;
                this.setState({ imageUri: uri }, () => {
                    this.props.onImageSelect(uri);
                });
            }
        }else{
            alert('Você precisa permitir acesso à galeria!');
        }
    };

    loadImage = async () => {
        const data = await loadData();
        if (data) {
            this.setState({ imageUri: data.imageUri || null });
        }
    }

    componentDidMount() {
        this.loadImage();
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.imageButton}
                onPress={this.pickImage}
            >
                <ImageBackground
                    source={this.state.imageUri ? { uri: this.state.imageUri }: undefined}
                    style={styles.imageBackground}
                    imageStyle={{ borderRadius: 30 }}
                >
                    {!this.state.imageUri && (
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Enviar Foto</Text>
                        </View>
                    )}
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textContainer: {
        
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -45}, {translateY: -10}],
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Error',
        textAlign: 'center',
    },
    imageButton: {
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 10,
        width: width * 0.33,
        height: height * 0.22,
        position: 'absolute',
        top: '6%',
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