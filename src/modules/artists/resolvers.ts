import Artists from "./artists";



export const resolvers = {
    Query: {
        artists() {
            const artists = new Artists();

            artists.getAll().then((result) => {
                console.log(result)
            });

            return [];
        },
        artist(parent: any, args: any) {
            const artists = new Artists();

            return artists.find(args.id);
        }
    }
};