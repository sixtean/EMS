import * as FileSystem from 'expo-file-system';

const folderPath: string = FileSystem.documentDirectory + 'userData/';
const filePath: string = folderPath + 'userData.json';

export const createFolder = async () => {
    try {
        const folderInfo = await FileSystem.getInfoAsync(folderPath);
        
        if (!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true});
        }
    } catch (error) {
        console.error("Erro ao criar pasta: ", error);
    }
};

export const saveData = async (imageUri: string, instrumento: string, nome: string, nomeIstrumentista: string) => {
    await createFolder();

    const data = JSON.stringify({
        imageUri,
        instrumento,
        nome,
        nomeIstrumentista
    });

    try {
        await FileSystem.writeAsStringAsync(filePath, data, {
            encoding: FileSystem.EncodingType.UTF8,
        });
    }catch (error) {
        console.error('Erro ao salvar os dados: ', error);
    }
}

export const loadData = async () => {
    try {
        const fileData = await FileSystem.readAsStringAsync(filePath, {
            encoding: FileSystem.EncodingType.UTF8,
        });
        return JSON.parse(fileData);
    }catch (error) {
        console.error('Erro ao carregar os dados: ', error);
        return null;
    }
};

export const clearData = async () => {
    try {
        await FileSystem.deleteAsync(filePath, { idempotent: true });
        const folderInfo = await FileSystem.getInfoAsync(folderPath);
        if(folderInfo.exists) {
            const filesInFolder = await FileSystem.readDirectoryAsync(folderPath);
            if(filesInFolder.length === 0) {
                await FileSystem.deleteAsync(folderPath, {idempotent: true});
            }
        }
    } catch (error) {
        console.error('Erro ao apagar dados: ', error);
    }
};