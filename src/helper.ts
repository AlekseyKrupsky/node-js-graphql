export const getRelated = async (parent: any, context: any, type: string, fieldName?: string) => {
    const relatedItems = [];
    const parentItemsIdsFieldName = fieldName ? fieldName : `${type}Ids`;

    for (let itemId of parent[parentItemsIdsFieldName]) {
        const item = await getOneRelated(itemId, context, type);

        relatedItems.push(item);

        relatedItems.map((item: any) => {
            item.id = item._id;
        });
    }

    return relatedItems;
};

export const getOneRelated = async (id: string, context: any, type: string) => {
    const item = await context.dataSources[`${type}API`].find(id);

    item.id = item._id;

    return item;
};
