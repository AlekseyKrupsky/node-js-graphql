import { getRelated } from "../../helper";
import { EntityPlural } from "../../enums/entityTypes";
import { Context } from "../../types/context";
import {defaultEntity, fullEntity, newEntity} from "../../types/entities";

const TRACKS_FIELD_NAME = 'trackIds';

export const resolvers = {
    Query: {
        albums: async (parent: undefined, args: { limit: any, offset: any }, context: Context) => {
            return context.dataSources.albumsAPI.getAll(args);
        },
        album: async (parent: undefined, args: { id: string }, context: Context) => {

            return context.dataSources.albumsAPI.find(args.id);
        },
    },
    Album: {
        bands: async (album: fullEntity, args: any, context: Context) => {
            return getRelated(album, context, EntityPlural.BANDS);
        },
        artists: async (album: fullEntity, args: any, context: Context) => {
            return getRelated(album, context, EntityPlural.ARTISTS);
        },
        genres: async (album: fullEntity, args: any, context: Context) => {
            return getRelated(album, context, EntityPlural.GENRES);
        },
        tracks: async (album: fullEntity, args: any, context: Context) => {
            return getRelated(album, context, EntityPlural.TRACKS, TRACKS_FIELD_NAME);
        },
    },
    Mutation: {
        createAlbum: async (parent: undefined, args: newEntity, context: Context) => {
            args.artistsIds = args.artists;
            args.bandsIds = args.bands;
            args.trackIds = args.tracks;
            args.genresIds = args.genres;

            return context.dataSources.albumsAPI.create(args);
        },
        updateAlbum: async (parent: undefined, args: defaultEntity, context: Context) => {
            args.artistsIds = args.artists;
            args.bandsIds = args.bands;
            args.trackIds = args.tracks;
            args.genresIds = args.genres;

            return context.dataSources.albumsAPI.update(args);
        },
        deleteAlbum: async (parent: undefined, args: { id: string }, context: Context) => {
            return context.dataSources.albumsAPI.remove(args.id);
        },
    }
};
