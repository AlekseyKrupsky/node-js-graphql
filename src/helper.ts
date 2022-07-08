import { fullEntity } from "./types/entities";
import { Context } from "./types/context";
import { Etest2 } from "./modules/favourites/favouritesAPI";

export const getRelated = async (
    parent: any,
    context: Context,
    type: "users" | "tracks" | "genres" | "favourites" | "bands" | "artists" | "albums",
    fieldName?: string
): Promise<fullEntity[]> => {
    const relatedItems: fullEntity[] = [];
    const parentItemsIdsFieldName: string = fieldName ? fieldName : `${type}Ids`;

    for (let itemId of parent[parentItemsIdsFieldName]) {
        const item: fullEntity | null = await getOneRelated(itemId, context, type);

        if (item) {
            relatedItems.push(item);
        }

        relatedItems.map((item: fullEntity) => {
            item.id = item._id;
        });
    }

    return relatedItems;
};

export const getOneRelated = async (id: string, context: Context, type: Etest2): Promise<fullEntity | null> => {
    if (!id) {
        return null;
    }

    //@ts-ignore
    return context.dataSources[`${type}API`].find(id);
};
