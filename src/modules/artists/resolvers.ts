import { getRelated } from "../../helper";
import { entityTypes } from "../../enums/entityTypes";

export const resolvers = {
    Query: {
        artists: async (parent: any, args: any, context: any) => {
            return context.dataSources.artistsAPI.getAll(args);
        },
        artist: async (parent: any, args: any, context: any) => {
            return context.dataSources.artistsAPI.find(args.id);
        }
    },
    Artist: {
        bands: async (artist: any, args: any, context: any) => {
            return await getRelated(artist, context, entityTypes.BANDS);
        }
    },
    Mutation: {
        createArtist: async (parent: any, args: any, context: any) => {
            args.bandsIds = args.bands;

            return context.dataSources.artistsAPI.create(args, context.token);
        },
        updateArtist: async (parent: any, args: any, context: any) => {
            args.bandsIds = args.bands;

            return context.dataSources.artistsAPI.update(args, context.token);
        },
        deleteArtist: async (parent: any, args: any, context: any) => {
            return context.dataSources.artistsAPI.remove(args.id, context.token);
        },
    }
};
