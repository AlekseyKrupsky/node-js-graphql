import { getRelated } from "../../helper";

export const resolvers = {
    Query: {
        artists: async (parent: any, args: any, context: any) => {
            const artistsList = await context.dataSources.artistsAPI.getAll();

            return artistsList.items;
        },
        artist: async (parent: any, args: any, context: any) => {
            return context.dataSources.artistsAPI.find(args.id);
        }
    },
    Artist: {
        bands: async (artist: any, args: any, context: any) => {
            return await getRelated(artist, context, 'bands', 'bands');
        }
    }
};
