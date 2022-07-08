import { Context } from "../../types/context";
import {defaultEntity, fullEntity} from "../../types/entities";

export type CreateGenre = {
    name: string,
    description?: string,
    country?: string,
    year?: number
};

export const resolvers = {
    Query: {
        genres: async (parent: undefined, args: any, context: Context): Promise<fullEntity[]> => {
            return context.dataSources.genresAPI.getAll(args);
        },
        genre: async (parent: undefined, args: any, context: Context): Promise<fullEntity> => {
            return context.dataSources.genresAPI.find(args.id);
        }
    },
    Mutation: {
        createGenre: async (parent: undefined, args: CreateGenre, context: Context): Promise<fullEntity> => {
            return context.dataSources.genresAPI.create(args);
        },
        updateGenre: async (parent: undefined, args: defaultEntity, context: Context): Promise<fullEntity> => {
            return context.dataSources.genresAPI.update(args);
        },
        deleteGenre: async (parent: undefined, args: { id: string }, context: Context) => {
            return context.dataSources.genresAPI.remove(args.id);
        },
    }
};
