import { getRelated } from "../../helper";
import { favouritesActionTypes as actionTypes } from "../../enums/favouritesActionTypes";
import { entityTypes } from "../../enums/entityTypes";

export const resolvers = {
    Query: {
        favourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.getAll(context.token);
        },
    },
    Favourites: {
        bands: async (parent: any, args: any, context: any) => {
            return getRelated(parent, context, entityTypes.BANDS);
        },
        genres: async (parent: any, args: any, context: any) => {
            return getRelated(parent, context, entityTypes.GENRES);
        },
        artists: async (parent: any, args: any, context: any) => {
            return getRelated(parent, context, entityTypes.ARTISTS);
        },
        tracks: async (parent: any, args: any, context: any) => {
            return getRelated(parent, context, entityTypes.TRACKS);
        },
    },
    Mutation: {
        addTrackToFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.TRACKS, context.token, actionTypes.ADD);
        },
        addBandToFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.BANDS, context.token, actionTypes.ADD);
        },
        addArtistToFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.ARTISTS, context.token, actionTypes.ADD);
        },
        addGenreToFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.GENRES, context.token, actionTypes.ADD);
        },
        removeTrackFromFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.TRACKS, context.token, actionTypes.REMOVE);
        },
        removeBandFromFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.BANDS, context.token, actionTypes.REMOVE);
        },
        removeArtistFromFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.ARTISTS, context.token, actionTypes.REMOVE);
        },
        removeGenreFromFavourites: async (parent: any, args: any, context: any) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.GENRES, context.token, actionTypes.REMOVE);
        },
    }
};
