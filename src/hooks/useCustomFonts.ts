import { useFonts } from 'expo-font';


export const useCustomFonts = () => {
    const [fontsLoaded] = useFonts({
        'Error': require('../assets/fonts/Roboto/static/Roboto_SemiCondensed-Regular.ttf'),
        'Button': require('../assets/fonts/Roboto/static/Roboto-ExtraBold.ttf'),
        "Titulo": require('../assets/fonts/Playfair_Display/static/PlayfairDisplay-Bold.ttf'),
    });
    return fontsLoaded;
};