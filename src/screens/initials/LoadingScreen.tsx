import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCustomFonts } from '../../hooks/useCustomFonts';
import ContainerButton from '../../components/ContainerButton';
import { LinearGradient } from 'expo-linear-gradient';
import Lottieview from 'lottie-react-native';
import { useNavigation} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Loading: undefined;
    Dados: undefined
};

const LoadingScreen: React.FC = () => {
    const fontsLoaded = useCustomFonts();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Loading'>>();

    if(fontsLoaded) {
         return (
            <LinearGradient
                colors={['#FF007F', '#00005a']}
                locations={[0.2, 0.7]}
                start={{ x: -0.9, y: -0.2}}
                end={{ x: 1.4, y: 1.2}}
                style={styles.container}
            >

                <Text style={styles.titulo}>
                    Bem vindo ao
                </Text>
                <Text style={styles.ems}>
                    EMS
                </Text>
                
                <Lottieview
                    source={require('../../animations/initial/intial.json')}
                    autoPlay
                    loop
                    style={styles.lottieAnimation}
                />

                <View style={styles.init}>

                   

                    <Text style={styles.textInclude}>
                        E ai! Sabia que agora tem um app pra te dar um help nos estudos musicais da CCB ?
                    </Text>

                    <View style={styles.buttonContainer}>
                        <ContainerButton 
                            title='Acessar'
                            onPress={() => {
                                navigation.navigate('Dados');
                            }}
                            style={{
                                backgroundColor: 'transparent',
                                minHeight: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            textStyle={{
                                color: '#fff',
                                fontSize: 30,
                                fontFamily: 'Button',
                                fontWeight: 600,
                                textAlign: 'center',
                                textAlignVertical: 'center',
                                includeFontPadding: false,
                            }}
                        />
                    </View>
                </View>
            </LinearGradient>
        );
    }   
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    titulo: {
        fontFamily: 'Titulo',
        fontSize: 37,
        bottom: '30%',
        right: '14%',
    },
    ems: {
        position: 'relative',
        fontSize: 37,
        fontFamily: 'Titulo',
        color: '#DAA520',
        bottom: '36%',
        left: '26%',
        zIndex: 1,
    },
    init: {
        position: 'absolute', 
        bottom: 60,
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    textInclude: {
        color: '#fff',
        width: '80%',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Error',
        position: 'absolute',
        bottom: '100%',
        left: '10%',
        marginBottom: 40,
    },
    lottieAnimation: {
        position: 'absolute',
        width: '50%',
        height: '50%',
    }

});

export default LoadingScreen;