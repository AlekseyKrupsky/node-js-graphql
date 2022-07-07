import { getOneRelated, getRelated } from "../../helper";
import { EntityPlural } from "../../enums/entityTypes";
import { Context } from "../../types/context";
import {defaultEntity, fullEntity, newEntity} from "../../types/entities";

export const resolvers = {
    Query: {
        tracks: async (parent: undefined, args: { limit: any, offset: any }, context: Context) => {
            return context.dataSources.tracksAPI.getAll(args);
        },
        track: async (parent: undefined, args: { id: string }, context: Context) => {
            return context.dataSources.tracksAPI.find(args.id);
        }
    },
    Track: {
        artists: async (track: fullEntity, args: any, context: Context) => {
            return getRelated(track, context, EntityPlural.ARTISTS);
        },
        bands: async (track: fullEntity, args: any, context: Context) => {
            return getRelated(track, context, EntityPlural.BANDS);
        },
        genres: async (track: fullEntity, args: any, context: Context) => {
            return getRelated(track, context, EntityPlural.GENRES);
        },
        album: async (track: fullEntity, args: any, context: Context) => {
            return getOneRelated(track.albumId, context, EntityPlural.ALBUMS);
        }
    },
    Mutation: {
        createTrack: async (parent: undefined, args: newEntity, context: Context) => {
            args.albumId = args.album;
            args.bandsIds = args.bands;
            args.artistsIds = args.artists;
            args.genresIds = args.genres;

            return context.dataSources.tracksAPI.create(args);
        },
        updateTrack: async (parent: undefined, args: defaultEntity, context: Context) => {
            args.albumId = args.album;
            args.bandsIds = args.bands;
            args.artistsIds = args.artists;
            args.genresIds = args.genres;

            return context.dataSources.tracksAPI.update(args);
        },
        deleteTrack: async (parent: undefined, args: { id: string }, context: Context) => {
            return context.dataSources.tracksAPI.remove(args.id);
        },
    }
};
