import { getOneRelated, getRelated } from "../../helper";
import { entityTypes } from "../../enums/entityTypes";
import { Context } from "../../types/context";

export type CreateBand = {
    name: string,
    origin: string | null,
    website: string | null,
    members: {
        artist: string | null,
        instrument: string | null,
        years: string[] | null
    }[],
    genres: string[] | null
}

export const resolvers = {
    Query: {
        bands: async (parent: any, args: any, context: Context) => {
            return context.dataSources.bandsAPI.getAll(args);
        },
        band: async (parent: any, args: any, context: Context) => {
            return context.dataSources.bandsAPI.find(args.id);
        }
    },
    Band: {
        genres: async (band: any, args: any, context: Context) => {
            return getRelated(band, context, entityTypes.GENRES);
        }
    },
    Member: {
        artist: async (member: any, args: any, context: Context) => {
            const artistId = member['artist'];

            return getOneRelated(artistId, context, entityTypes.ARTISTS);
        }
    },
    Mutation: {
        createBand: async (parent: any, args: CreateBand, context: Context) => {
            return context.dataSources.bandsAPI.create(args);
        },
        updateBand: async (parent: any, args: any, context: Context) => {
            return context.dataSources.bandsAPI.update(args);
        },
        deleteBand: async (parent: any, args: any, context: Context) => {
            return context.dataSources.bandsAPI.remove(args.id);
        },
    }
};
