import { fullEntity } from "./types/entities";
import { Context } from "./types/context";
import { EntityPluralUnion } from "./types/entityTypes";
import MusicianAPI from "./musicianAPI";

export const getRelated = async (
    parent: any,
    context: Context,
    type: EntityPluralUnion,
    args: { limit: any, offset: any },
    fieldName?: string,
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

    let offset = 0;
    let limit = relatedItems.length;

    if (typeof args.offset === "number") {
        offset = args.offset;
    } else if (args.offset !== undefined) {
        throw new Error("Offset should be a number");
    }

    if (typeof args.limit === "number") {
        limit = args.limit + offset;
    } else if (args.limit !== undefined) {
        throw new Error("Limit should be a number");
    }

    return relatedItems.slice(offset, limit);
};

export const getOneRelated = async (id: string, context: Context, type: EntityPluralUnion): Promise<fullEntity | null> => {
    if (!id) {
        return null;
    }

    const dataSource = context.dataSources[`${type}API`] as MusicianAPI;

    return dataSource.find(id);
};
