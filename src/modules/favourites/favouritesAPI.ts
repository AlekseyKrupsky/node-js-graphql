import { RESTDataSource } from "apollo-datasource-rest";

const entityTypesPluralMap: {
    [key:string]: string
} = {
    tracks: 'track',
    bands: 'band',
    artists: 'artist',
    genres: 'genre',
}

class FavouritesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.FAVOURITES_URL;
    }

    async getAll(token: string) {
        const favourites = await this.get('', {}, { headers: { Authorization: `${token}` }});

        favourites.id = favourites._id;

        return favourites;
    }

    async putRequest(args: { [key:string]: string }, type: string, token: string, actionType: string) {
        const id = args[entityTypesPluralMap[type]];
        const body = {
            id: id,
            type: type
        }

        const favourites = await this.put(actionType, body, { headers: { Authorization: `${token}` }});

        favourites.id = favourites._id;

        return favourites;
    }
}

export default FavouritesAPI;
