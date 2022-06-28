export const resolvers = {
    Query: {
        tracks: async (parent: any, args: any, context: any) => {
            const tracksList = await context.dataSources.tracksAPI.getAll();

            return tracksList.items;
        },
        track: async (parent: any, args: any, context: any) => {
            return context.dataSources.tracksAPI.find(args.id);
        }
    }
};
