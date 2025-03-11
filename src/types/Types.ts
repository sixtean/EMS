import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
    Loading: undefined;
    Dados: undefined;
    Home: undefined;
    Settings: undefined;
}

export type DadosScreenProps = StackScreenProps<RootStackParamList, 'Dados'>;
export type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;