import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';

interface InstrumentosButtonProps {
    onInstrumentoSelect: (instrumento: string, nomeInstrumentista: string) => void;
}
interface InstrumentoButtonState {
    modalVisible: boolean;
    instrumentoSelecionado: string | null;
    nomeInstrumentista: string | null;
    instrumentos: { [key: string]: string };
}

const screenHeigth = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
class InstrumentoButton extends React.Component<InstrumentosButtonProps, InstrumentoButtonState> {
    constructor(props: InstrumentosButtonProps) {
        super(props);
        this.state = {
            modalVisible : false,
            instrumentoSelecionado: null,
            nomeInstrumentista: null,
            instrumentos: {
                "Violino": "Violinista",
                "Viola Clássica": "Violista",
                "Violoncelo": "Violonocelista",
                "Flauta Transversal": "Flautista",
                "Oboé": "Oboista",
                "Corne Inglês": "Corneísta",
                "Clarinete": "Clarinetista",
                "Fagote": "Fagotista",
                "Saxofone": "Saxofonista",
                "Trompete": "Trompetista",
                "Corneta": "Cornetista",
                "Trombone": "trombonista",
                "Tuba": "Tubista",
                "Acordeon": "Acordeonista",
                "Orgão": "Organista",
            }
        };
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            modalVisible: !prevState.modalVisible,
        }));
    };

    handleInstrumentoSelect = (instrumento: string) => {
        const nomeInstrumentista = this.state.instrumentos[instrumento];
        this.setState({
            instrumentoSelecionado: instrumento,
            nomeInstrumentista: nomeInstrumentista,
        });
        this.props.onInstrumentoSelect(instrumento, nomeInstrumentista);
        this.toggleModal();
    };

    render() {
        const { instrumentoSelecionado } = this.state;
        const selectedTextColor = instrumentoSelecionado ? '#34D399' : '#5c5c5ced';

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.toggleModal} style={styles.button}>
                    <Text style={[styles.buttonText, { color: selectedTextColor }]}>
                        {instrumentoSelecionado ? instrumentoSelecionado : "Selecione seu instrumento:"}
                    </Text>
                </TouchableOpacity>

                <Modal visible={this.state.modalVisible} transparent={true} animationType="fade">
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Selecione seu instrumento</Text>
                            <FlatList
                                data={Object.keys(this.state.instrumentos)}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => this.handleInstrumentoSelect(item)}
                                        style={styles.modalItem}
                                    >
                                        <Text style={styles.modalItemText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item}
                            />
                            <TouchableOpacity onPress={this.toggleModal} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        top: screenHeigth * 0.5,
        right: -screenWidth * 0.45,
        backgroundColor: 'transparent',
        paddingVertical: screenHeigth * 0.02,
        width: screenWidth * 0.91,
        borderBottomWidth: 2,
        borderRadius: 1,
        borderColor: '#fff',
    },
    buttonText: {
        fontSize: screenHeigth * 0.02,
        color: '#5c5c5ced',
        textAlign: 'justify',
        paddingHorizontal: 20,
        fontFamily: 'Error',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: '#ffffff',
        padding: screenHeigth * 0.03,
        borderRadius: 20,
        width: screenWidth * 0.9,
        alignItems: 'center',
        maxHeight: screenHeigth * 0.8,
    },
    modalTitle: {
        fontSize: screenHeigth * 0.025,
        marginBottom: screenHeigth * 0.02,
        fontFamily: 'Button',
    },
    modalItem: {
        padding: screenHeigth * 0.014,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        width: screenWidth * 0.8,
    },
    modalItemText: {
        fontSize: screenHeigth * 0.02,
        fontFamily: 'Error',
        paddingVertical: 10,
    },
    closeButton: {
        marginTop: screenHeigth * 0.01,
        paddingVertical: screenHeigth * 0.01,
        backgroundColor: '#86027de2',
        borderRadius: 5,
        width: '80%',
        alignItems: 'center'
    },
    closeButtonText: {
        color: '#fff',
        fontSize: screenHeigth * 0.02,
        fontFamily: 'Error',
    },
});

export default InstrumentoButton;