import { Context } from "../../types/context";

export type CreateGenre = {
    name: string,
    description: string,
    country: string,
    year: number
};

export const resolvers = {
    Query: {
        genres: async (parent: any, args: any, context: Context) => {
            return context.dataSources.genresAPI.getAll(args);
        },
        genre: async (parent: any, args: any, context: Context) => {
            return context.dataSources.genresAPI.find(args.id);
        }
    },
    Mutation: {
        createGenre: async (parent: any, args: CreateGenre, context: Context) => {
            return context.dataSources.genresAPI.create(args);
        },
        updateGenre: async (parent: any, args: any, context: Context) => {
            return context.dataSources.genresAPI.update(args);
        },
        deleteGenre: async (parent: any, args: any, context: Context) => {
            return context.dataSources.genresAPI.remove(args.id);
        },
    }
};
