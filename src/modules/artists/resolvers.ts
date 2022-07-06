import { getRelated } from "../../helper";
import { entityTypes } from "../../enums/entityTypes";
import { Context } from "../../types/context";

export const resolvers = {
    Query: {
        artists: async (parent: any, args: any, context: Context) => {
            return context.dataSources.artistsAPI.getAll(args);
        },
        artist: async (parent: any, args: any, context: Context) => {
            return context.dataSources.artistsAPI.find(args.id);
        }
    },
    Artist: {
        bands: async (artist: any, args: any, context: Context) => {
            return await getRelated(artist, context, entityTypes.BANDS);
        }
    },
    Mutation: {
        createArtist: async (parent: any, args: any, context: Context) => {
            args.bandsIds = args.bands;

            return context.dataSources.artistsAPI.create(args);
        },
        updateArtist: async (parent: any, args: any, context: Context) => {
            args.bandsIds = args.bands;

            return context.dataSources.artistsAPI.update(args);
        },
        deleteArtist: async (parent: any, args: any, context: Context) => {
            return context.dataSources.artistsAPI.remove(args.id);
        },
    }
};
