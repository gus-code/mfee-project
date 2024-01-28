export const getArrayItemIndexByField = (itemsArray: any[], searchField: string, searchItem: string) => {
    return itemsArray.findIndex((item) => item[searchField] === searchItem);
};

export const getArrayItemByField = (itemsArray: any[], searchField: string, searchItem: string) => {
    return itemsArray.find((item) => item[searchField] === searchItem);
};