import { getOneRelated, getRelated } from "../../helper";
import { EntityPlural } from "../../enums/entityTypes";
import { Context } from "../../types/context";
import { defaultEntity, fullEntity, newEntity } from "../../types/entities";

export const resolvers = {
    Query: {
        bands: async (parent: undefined, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.bandsAPI.getAll(args);
        },
        band: async (parent: undefined, args: { id: string }, context: Context): Promise<fullEntity> => {
            return context.dataSources.bandsAPI.find(args.id);
        }
    },
    Band: {
        genres: async (band: fullEntity, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return getRelated(band, context, EntityPlural.GENRES, args);
        }
    },
    Member: {
        artist: async (member: any, args: any, context: Context): Promise<fullEntity | null> => {
            const artistId = member['artist'];

            return getOneRelated(artistId, context, EntityPlural.ARTISTS);
        }
    },
    Mutation: {
        createBand: async (parent: undefined, args: newEntity, context: Context): Promise<fullEntity> => {
            return context.dataSources.bandsAPI.create(args);
        },
        updateBand: async (parent: undefined, args: defaultEntity, context: Context): Promise<fullEntity> => {
            return context.dataSources.bandsAPI.update(args);
        },
        deleteBand: async (parent: undefined, args: { id: string }, context: Context) => {
            return context.dataSources.bandsAPI.remove(args.id);
        },
    }
};
