import { getRelated } from "../../helper";
import { actionTypes } from "./favouritesAPI";

const enum types {
    TRACKS = 'tracks',
    BANDS = 'bands',
    ARTISTS = 'artists',
    GENRES = 'genres',
}

export const resolvers = {
    Query: {
        favourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.getAll(context.token);
        },
    },
    Favourites: {
        bands: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, types.BANDS);
        },
        genres: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, types.GENRES);
        },
        artists: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, types.ARTISTS);
        },
        tracks: async (parent: any, args: any, context: any) => {
            return await getRelated(parent, context, types.TRACKS);
        },
    },
    Mutation: {
        addTrackToFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.TRACKS, context.token, actionTypes.ADD);
        },
        addBandToFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.BANDS, context.token, actionTypes.ADD);
        },
        addArtistToFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.ARTISTS, context.token, actionTypes.ADD);
        },
        addGenreToFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.GENRES, context.token, actionTypes.ADD);
        },
        removeTrackFromFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.TRACKS, context.token, actionTypes.REMOVE);
        },
        removeBandFromFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.BANDS, context.token, actionTypes.REMOVE);
        },
        removeArtistFromFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.ARTISTS, context.token, actionTypes.REMOVE);
        },
        removeGenreFromFavourites: async (parent: any, args: any, context: any) => {
            return await context.dataSources.favouritesAPI.putRequest(args, types.GENRES, context.token, actionTypes.REMOVE);
        },
    }
};
