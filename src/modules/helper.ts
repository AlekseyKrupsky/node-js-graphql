export const getRelated = async (parent: any, context: any, type: string) => {
    const allItems = await context.dataSources[`${type}API`].getAll();

    const relatedItems = allItems.items.filter((item: any) => parent[`${type}Ids`].indexOf(item._id) !== -1);

    relatedItems.map((item: any) => {
        item.id = item._id;
    });

    return relatedItems;
};
