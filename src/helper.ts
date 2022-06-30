export const getRelated = async (parent: any, context: any, type: string, fieldName?: string) => {
    const allItems = await context.dataSources[`${type}API`].getAll();

    const parentFieldName = fieldName ? fieldName : `${type}Ids`;

    const relatedItems = allItems.items.filter((item: any) => parent[parentFieldName].indexOf(item._id) !== -1);

    relatedItems.map((item: any) => {
        item.id = item._id;
    });

    return relatedItems;
};
