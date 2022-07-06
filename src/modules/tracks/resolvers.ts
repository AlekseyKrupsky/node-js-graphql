import { getOneRelated, getRelated } from "../../helper";
import { entityTypes } from "../../enums/entityTypes";
import { Context } from "../../types/context";

export const resolvers = {
    Query: {
        tracks: async (parent: any, args: any, context: Context) => {
            return context.dataSources.tracksAPI.getAll(args);
        },
        track: async (parent: any, args: any, context: Context) => {
            return context.dataSources.tracksAPI.find(args.id);
        }
    },
    Track: {
        artists: async (track: any, args: any, context: Context) => {
            return getRelated(track, context, entityTypes.ARTISTS);
        },
        bands: async (track: any, args: any, context: Context) => {
            return getRelated(track, context, entityTypes.BANDS);
        },
        genres: async (track: any, args: any, context: Context) => {
            return getRelated(track, context, entityTypes.GENRES);
        },
        album: async (track: any, args: any, context: Context) => {
            return getOneRelated(track.albumId, context, entityTypes.ALBUMS);
        }
    },
    Mutation: {
        createTrack: async (parent: any, args: any, context: Context) => {
            args.albumId = args.album;
            args.bandsIds = args.bands;
            args.artistsIds = args.artists;
            args.genresIds = args.genres;

            return context.dataSources.tracksAPI.create(args);
        },
        updateTrack: async (parent: any, args: any, context: Context) => {
            args.albumId = args.album;
            args.bandsIds = args.bands;
            args.artistsIds = args.artists;
            args.genresIds = args.genres;

            return context.dataSources.tracksAPI.update(args);
        },
        deleteTrack: async (parent: any, args: any, context: Context) => {
            return context.dataSources.tracksAPI.remove(args.id);
        },
    }
};
