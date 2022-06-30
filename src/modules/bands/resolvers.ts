import { getRelated } from "../../helper";

export const resolvers = {
    Query: {
        bands: async (parent: any, args: any, context: any) => {
            const bandsList = await context.dataSources.bandsAPI.getAll();

            return bandsList.items;
        },
        band: async (parent: any, args: any, context: any) => {
            return context.dataSources.bandsAPI.find(args.id);
        }
    },
    Band: {
        genres: async (band: any, args: any, context: any) => {
            return await getRelated(band, context, 'genres');
        }
    }
};
