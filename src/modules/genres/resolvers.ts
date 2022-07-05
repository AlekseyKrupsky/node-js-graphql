export type CreateGenre = {
    name: string,
    description: string,
    country: string,
    year: number
};

export const resolvers = {
    Query: {
        genres: async (parent: any, args: any, context: any) => {
            return context.dataSources.genresAPI.getAll(args);
        },
        genre: async (parent: any, args: any, context: any) => {
            return context.dataSources.genresAPI.find(args.id);
        }
    },
    Mutation: {
        createGenre: async (parent: any, args: CreateGenre, context: any) => {
            return context.dataSources.genresAPI.create(args, context.token);
        },
        updateGenre: async (parent: any, args: any, context: any) => {
            return context.dataSources.genresAPI.update(args, context.token);
        },
        deleteGenre: async (parent: any, args: any, context: any) => {
            return context.dataSources.genresAPI.remove(args.id, context.token);
        },
    }
};
