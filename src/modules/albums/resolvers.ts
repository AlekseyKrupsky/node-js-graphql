import { getRelated } from "../../helper";
import { entityTypes } from "../../enums/entityTypes";
import { Context } from "../../types/context";

const TRACKS_FIELD_NAME = 'trackIds';

export const resolvers = {
    Query: {
        albums: async (parent: any, args: any, context: Context) => {
            console.log(parent);

            return context.dataSources.albumsAPI.getAll(args);
        },
        album: async (parent: any, args: any, context: Context) => {
            console.log(parent);
            return context.dataSources.albumsAPI.find(args.id);
        },
    },
    Album: {
        bands: async (album: any, args: any, context: Context) => {
            console.log(album);
            return getRelated(album, context, entityTypes.BANDS);
        },
        artists: async (album: any, args: any, context: Context) => {
            return getRelated(album, context, entityTypes.ARTISTS);
        },
        genres: async (album: any, args: any, context: Context) => {
            return getRelated(album, context, entityTypes.GENRES);
        },
        tracks: async (album: any, args: any, context: Context) => {
            return getRelated(album, context, entityTypes.TRACKS, TRACKS_FIELD_NAME);
        },
    },
    Mutation: {
        createAlbum: async (parent: any, args: any, context: Context) => {
            args.artistsIds = args.artists;
            args.bandsIds = args.bands;
            args.trackIds = args.tracks;
            args.genresIds = args.genres;

            return context.dataSources.albumsAPI.create(args);
        },
        updateAlbum: async (parent: any, args: any, context: Context) => {
            args.artistsIds = args.artists;
            args.bandsIds = args.bands;
            args.trackIds = args.tracks;
            args.genresIds = args.genres;

            return context.dataSources.albumsAPI.update(args);
        },
        deleteAlbum: async (parent: any, args: any, context: Context) => {
            return context.dataSources.albumsAPI.remove(args.id);
        },
    }
};
