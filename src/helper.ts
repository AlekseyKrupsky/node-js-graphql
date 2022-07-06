import { microserviceEntity, defaultEntity } from "./musicianAPI";

export const getRelated = async (
    parent: any,
    context: any,
    type: string,
    fieldName?: string
): Promise<(defaultEntity | microserviceEntity)[]> => {
    const relatedItems: microserviceEntity[] = [];
    const parentItemsIdsFieldName: string = fieldName ? fieldName : `${type}Ids`;

    for (let itemId of parent[parentItemsIdsFieldName]) {
        const item: microserviceEntity | null = await getOneRelated(itemId, context, type);

        if (item) {
            relatedItems.push(item);
        }

        relatedItems.map((item: defaultEntity | microserviceEntity) => {
            item.id = item._id;
        });
    }

    return relatedItems;
};

export const getOneRelated = async (id: string, context: any, type: string): Promise<microserviceEntity | null> => {
    if (!id) {
        return null;
    }

    return context.dataSources[`${type}API`].find(id);
};
