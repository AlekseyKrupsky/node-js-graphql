export const resolvers = {
    Query: {
        albums: async (parent: any, args: any, context: any) => {
            const albumsList = await context.dataSources.albumsAPI.getAll();

            return albumsList.items;
        },
        album: async (parent: any, args: any, context: any) => {
            return context.dataSources.albumsAPI.find(args.id);
        }
    }
};
