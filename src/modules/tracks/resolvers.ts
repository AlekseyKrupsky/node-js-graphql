import { getOneRelated, getRelated } from "../../helper";

export const resolvers = {
    Query: {
        tracks: async (parent: any, args: any, context: any) => {
            const tracksList = await context.dataSources.tracksAPI.getAll();

            return tracksList.items;
        },
        track: async (parent: any, args: any, context: any) => {
            return context.dataSources.tracksAPI.find(args.id);
        }
    },
    Track: {
        artists: async (track: any, args: any, context: any) => {
            return await getRelated(track, context, 'artists');
        },
        bands: async (track: any, args: any, context: any) => {
            return await getRelated(track, context, 'bands');
        },
        genres: async (track: any, args: any, context: any) => {
            return await getRelated(track, context, 'genres');
        },
        album: async (track: any, args: any, context: any) => {
            return await getOneRelated(track.albumId, context, 'albums');
        }
    }
};
