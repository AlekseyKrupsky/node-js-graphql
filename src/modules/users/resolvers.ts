export const resolvers = {
    Query: {
        user: async (parent: any, args: any, context: any) => {
            return context.dataSources.usersAPI.find(args.id);
        }
    }
};
