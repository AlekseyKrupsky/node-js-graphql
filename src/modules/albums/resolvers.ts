import { getRelated } from "../helper";

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
    },
};
