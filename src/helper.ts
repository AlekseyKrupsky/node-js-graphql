import { microserviceEntity, defaultEntity } from "./types/entities";
import { Context } from "./types/context";

export const getRelated = async (
    parent: any,
    context: Context,
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

export const getOneRelated = async (id: string, context: Context, type: string): Promise<microserviceEntity | null> => {
    if (!id) {
        return null;
    }

    return context.dataSources[`${type}API`].find(id);
};
