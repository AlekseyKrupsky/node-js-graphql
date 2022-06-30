export const getRelated = async (parent: any, context: any, type: string, fieldName?: string) => {
    const allItems = await context.dataSources[`${type}API`].getAll();

    const parentFieldName = fieldName ? fieldName : `${type}Ids`;

    const relatedItems = allItems.items.filter((item: any) => parent[parentFieldName].indexOf(item._id) !== -1);

    relatedItems.map((item: any) => {
        item.id = item._id;
    });

    return relatedItems;
};

export const getOneRelated = async (id: string, context: any, type: string) => {
    const item = await context.dataSources[`${type}API`].find(id);

    item.id = item._id;

    return item;
};
