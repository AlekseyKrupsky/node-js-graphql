import { getRelated } from "../../helper";
import { favouritesActionTypes as actionTypes } from "../../enums/favouritesActionTypes";
import { entityTypes } from "../../enums/entityTypes";
import { Context } from "../../types/context";

export const resolvers = {
    Query: {
        favourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.getAll();
        },
    },
    Favourites: {
        bands: async (parent: any, args: any, context: Context) => {
            return getRelated(parent, context, entityTypes.BANDS);
        },
        genres: async (parent: any, args: any, context: Context) => {
            return getRelated(parent, context, entityTypes.GENRES);
        },
        artists: async (parent: any, args: any, context: Context) => {
            return getRelated(parent, context, entityTypes.ARTISTS);
        },
        tracks: async (parent: any, args: any, context: Context) => {
            return getRelated(parent, context, entityTypes.TRACKS);
        },
    },
    Mutation: {
        addTrackToFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.TRACKS, actionTypes.ADD);
        },
        addBandToFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.BANDS, actionTypes.ADD);
        },
        addArtistToFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.ARTISTS, actionTypes.ADD);
        },
        addGenreToFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.GENRES, actionTypes.ADD);
        },
        removeTrackFromFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.TRACKS, actionTypes.REMOVE);
        },
        removeBandFromFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.BANDS, actionTypes.REMOVE);
        },
        removeArtistFromFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.ARTISTS, actionTypes.REMOVE);
        },
        removeGenreFromFavourites: async (parent: any, args: any, context: Context) => {
            return context.dataSources.favouritesAPI.putRequest(args, entityTypes.GENRES, actionTypes.REMOVE);
        },
    }
};
