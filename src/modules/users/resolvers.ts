import { Context } from "../../types/context";

export const resolvers = {
    Query: {
        user: async (parent: undefined, args: { id: string }, context: Context) => {
            const user = await context.dataSources.usersAPI.find(args.id);

            user.secondName = user.lastName;
            user.id = user._id;

            return user;
        },
        jwt: async (parent: undefined, args: { email: string, password: string }, context: Context) => {
            const loginResponse = await context.dataSources.usersAPI.login(args);

            return loginResponse.jwt;
        },
        verify: async (parent: undefined, args: Object, context: Context) => {
            const user = await context.dataSources.usersAPI.verify();

            user.secondName = user.lastName;
            user.id = user._id;

            return user;
        },
    },
    Mutation: {
        register: async (parent: undefined, args: any, context: Context) => {
            args.lastName = args.secondName;

            const user = await context.dataSources.usersAPI.register(args);

            user.secondName = user.lastName;
            user.id = user._id;

            return user;
        },
    }
};
