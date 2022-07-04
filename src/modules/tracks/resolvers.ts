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
    },
    Mutation: {
        createTrack: async (parent: any, args: any, context: any) => {
            args.albumId = args.album;
            args.bandsIds = args.bands;
            args.artistsIds = args.artists;
            args.genresIds = args.genres;

            return context.dataSources.tracksAPI.create(args, context.token);
        },
        updateTrack: async (parent: any, args: any, context: any) => {
            args.albumId = args.album;
            args.bandsIds = args.bands;
            args.artistsIds = args.artists;
            args.genresIds = args.genres;

            return context.dataSources.tracksAPI.update(args, context.token);
        },
        deleteTrack: async (parent: any, args: any, context: any) => {
            return context.dataSources.tracksAPI.remove(args.id, context.token);
        },
    }
};
