import { getRelated } from "../../helper";
import { favouritesActionTypes as actionTypes } from "../../enums/favouritesActionTypes";
import { EntityPlural } from "../../enums/entityTypes";
import { Context } from "../../types/context";
import { fullEntity } from "../../types/entities";

export const resolvers = {
    Query: {
        favourites: async (parent: undefined, args: {}, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.getAll();
        },
    },
    Favourites: {
        bands: async (parent: fullEntity, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return getRelated(parent, context, EntityPlural.BANDS, args);
        },
        genres: async (parent: fullEntity, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return getRelated(parent, context, EntityPlural.GENRES, args);
        },
        artists: async (parent: fullEntity, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return getRelated(parent, context, EntityPlural.ARTISTS, args);
        },
        tracks: async (parent: fullEntity, args: { limit: any, offset: any }, context: Context): Promise<fullEntity[]> => {
            return getRelated(parent, context, EntityPlural.TRACKS, args);
        },
    },
    Mutation: {
        addTrackToFavourites: async (parent: undefined, args: { track: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.TRACKS, actionTypes.ADD);
        },
        addBandToFavourites: async (parent: undefined, args: { band: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.BANDS, actionTypes.ADD);
        },
        addArtistToFavourites: async (parent: undefined, args: { artist: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.ARTISTS, actionTypes.ADD);
        },
        addGenreToFavourites: async (parent: undefined, args: { genre: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.GENRES, actionTypes.ADD);
        },
        removeTrackFromFavourites: async (parent: undefined, args: { track: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.TRACKS, actionTypes.REMOVE);
        },
        removeBandFromFavourites: async (parent: undefined, args: { band: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.BANDS, actionTypes.REMOVE);
        },
        removeArtistFromFavourites: async (parent: undefined, args: { artist: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.ARTISTS, actionTypes.REMOVE);
        },
        removeGenreFromFavourites: async (parent: undefined, args: { genre: string }, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.favouritesAPI.putRequest(args, EntityPlural.GENRES, actionTypes.REMOVE);
        },
    }
};
