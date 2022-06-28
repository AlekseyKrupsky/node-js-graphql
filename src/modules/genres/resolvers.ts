export const resolvers = {
    Query: {
        genres: async (parent: any, args: any, context: any) => {
            const genresList = await context.dataSources.genresAPI.getAll();

            return genresList.items;
        },
        genre: async (parent: any, args: any, context: any) => {
            return context.dataSources.genresAPI.find(args.id);
        }
    }
};
