export const getItems = async () => {
    const response = await fetch('http://localhost:8000/item');
    return response.json();
};

export const addItem = async (item: string) => {
    const response = await fetch('http://localhost:8000/item', {
        method: 'POST',
        body: JSON.stringify(item),
    });
    return response.json();
};