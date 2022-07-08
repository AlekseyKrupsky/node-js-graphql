import { getRelated } from "../../helper";
import { EntityPlural } from "../../enums/entityTypes";
import { Context } from "../../types/context";
import {defaultEntity, fullEntity, newEntity} from "../../types/entities";

export const resolvers = {
    Query: {
        artists: async (parent: undefined, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.artistsAPI.getAll(args);
        },
        artist: async (parent: undefined, args: { id: string }, context: Context): Promise<fullEntity> => {
            return context.dataSources.artistsAPI.find(args.id);
        }
    },
    Artist: {
        bands: async (artist: fullEntity, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return await getRelated(artist, context, EntityPlural.BANDS, args);
        }
    },
    Mutation: {
        createArtist: async (parent: undefined, args: newEntity, context: Context): Promise<fullEntity> => {
            args.bandsIds = args.bands;

            return context.dataSources.artistsAPI.create(args);
        },
        updateArtist: async (parent: undefined, args: defaultEntity, context: Context): Promise<fullEntity> => {
            args.bandsIds = args.bands;

            return context.dataSources.artistsAPI.update(args);
        },
        deleteArtist: async (parent: undefined, args: { id: string }, context: Context) => {
            return context.dataSources.artistsAPI.remove(args.id);
        },
    }
};
