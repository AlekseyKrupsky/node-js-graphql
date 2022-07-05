export const resolvers = {
    Query: {
        user: async (parent: any, args: any, context: any) => {
            const user = await context.dataSources.usersAPI.find(args.id);

            user.secondName = user.lastName;
            user.id = user._id;

            return user;
        },
        jwt: async (parent: any, args: any, context: any) => {
            const loginResponse = await context.dataSources.usersAPI.login(args);

            return loginResponse.jwt;
        },
        verify: async (parent: any, args: any, context: any) => {
            const user = await context.dataSources.usersAPI.verify(context.token);

            user.secondName = user.lastName;
            user.id = user._id;

            return user;
        },
    },
    Mutation: {
        register: async (parent: any, args: any, context: any) => {
            args.lastName = args.secondName;

            const user = await context.dataSources.usersAPI.register(args);

            user.secondName = user.lastName;
            user.id = user._id;

            return user;
        },
    }
};
