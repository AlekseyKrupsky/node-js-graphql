export const resolvers = {
    Query: {
        favourites: async (parent: any, args: any, context: any) => {
            const favouritesList = await context.dataSources.favouritesAPI.getAll();

            return favouritesList.items;
        },
    }
};
