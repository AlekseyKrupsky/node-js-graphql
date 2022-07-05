import { RESTDataSource } from "apollo-datasource-rest";

export const enum actionTypes {
    ADD = 'add',
    REMOVE = 'remove'
}

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
        return this.get('', {}, { headers: { Authorization: `${token}` }});
    }

    async putRequest(args: { [key:string]: string }, type: string, token: string, actionType: string) {
        const id = args[entityTypesPluralMap[type]];
        const body = {
            id: id,
            type: type
        }

        return this.put(actionType, body, { headers: { Authorization: `${token}` }});
    }
}

export default FavouritesAPI;
