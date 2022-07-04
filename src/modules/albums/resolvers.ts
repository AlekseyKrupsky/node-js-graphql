import { getRelated } from "../../helper";

export const resolvers = {
    Query: {
        albums: async (parent: any, args: any, context: any) => {
            const albumsList = await context.dataSources.albumsAPI.getAll();

            return albumsList.items;
        },
        album: async (parent: any, args: any, context: any) => {
            return context.dataSources.albumsAPI.find(args.id);
        },
    },
    Album: {
        bands: async (album: any, args: any, context: any) => {
            return await getRelated(album, context, 'bands');
        },
        artists: async (album: any, args: any, context: any) => {
            return await getRelated(album, context, 'artists');
        },
        genres: async (album: any, args: any, context: any) => {
            return await getRelated(album, context, 'genres');
        },
        tracks: async (album: any, args: any, context: any) => {
            return await getRelated(album, context, 'tracks', 'trackIds');
        },
    },
    Mutation: {
        createAlbum: async (parent: any, args: any, context: any) => {
            args.artistsIds = args.artists;
            args.bandsIds = args.bands;
            args.trackIds = args.tracks;
            args.genresIds = args.genres;

            return context.dataSources.albumsAPI.create(args, context.token);
        },
        updateAlbum: async (parent: any, args: any, context: any) => {
            args.artistsIds = args.artists;
            args.bandsIds = args.bands;
            args.trackIds = args.tracks;
            args.genresIds = args.genres;

            return context.dataSources.albumsAPI.update(args, context.token);
        },
        deleteAlbum: async (parent: any, args: any, context: any) => {
            return context.dataSources.albumsAPI.remove(args.id, context.token);
        },
    }
};
