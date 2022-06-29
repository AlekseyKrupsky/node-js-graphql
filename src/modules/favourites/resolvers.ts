import {getRelated} from "../helper";

export const resolvers = {
    Query: {
        favourites: async (parent: any, args: any, context: any) => {
            const favouritesList = await context.dataSources.favouritesAPI.getAll();

            return favouritesList.items;
        },
    },
    Favourites: {
        bands: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, 'bands');
        },
        genres: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, 'genres');
        },
        artists: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, 'artists');
        },
        tracks: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, 'tracks');
        },
    }
};
