import api from '../../config/AxiosConfig'

export const getItems = async () => {
    const response = await api.get('/item');
    return response.data();
};

export const addItem = async (item: string) => {
    const response = await api.post('/item', item);
    return response.data();
};