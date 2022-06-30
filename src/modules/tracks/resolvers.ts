import { getRelated } from "../../helper";

export const resolvers = {
    Query: {
        tracks: async (parent: any, args: any, context: any) => {
            const tracksList = await context.dataSources.tracksAPI.getAll();

            return tracksList.items;
        },
        track: async (parent: any, args: any, context: any) => {
            return context.dataSources.tracksAPI.find(args.id);
        }
    },
    Track: {
        bands: async (track: any, args: any, context: any) => {
            return await getRelated(track, context, 'bands');
        },
        genres: async (track: any, args: any, context: any) => {
            return await getRelated(track, context, 'genres');
        },
        albums: async (track: any, args: any, context: any) => {
            const allItems = await context.dataSources[`albumsAPI`].getAll();

            const relatedItems = allItems.items.filter((item: any) => item.trackIds.indexOf(track._id) !== -1);

            relatedItems.map((item: any) => {
                item.id = item._id;
            });

            return relatedItems;
        }
    }
};
