import {getOneRelated, getRelated} from "../../helper";

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
        bands: async (parent: any, args: any, context: any) => {
            return context.dataSources.bandsAPI.getAll(args);
        },
        band: async (parent: any, args: any, context: any) => {
            return context.dataSources.bandsAPI.find(args.id);
        }
    },
    Band: {
        genres: async (band: any, args: any, context: any) => {
            return getRelated(band, context, 'genres');
        }
    },
    Member: {
        artist: async (member: any, args: any, context: any) => {
            return getOneRelated(member['artist'], context, 'artists');
        }
    },
    Mutation: {
        createBand: async (parent: any, args: CreateBand, context: any) => {
            return context.dataSources.bandsAPI.create(args, context.token);
        },
        updateBand: async (parent: any, args: any, context: any) => {
            return context.dataSources.bandsAPI.update(args, context.token);
        },
        deleteBand: async (parent: any, args: any, context: any) => {
            return context.dataSources.bandsAPI.remove(args.id, context.token);
        },
    }
};
