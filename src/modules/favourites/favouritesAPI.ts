import TokenizedAPI from "../../tokenizedAPI";

const entityTypesPluralMap: {
    [key:string]: string
} = {
    tracks: 'track',
    bands: 'band',
    artists: 'artist',
    genres: 'genre',
}

class FavouritesAPI extends TokenizedAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }

    async getAll() {
        const favourites = await this.get('');

        favourites.id = favourites._id;

        return favourites;
    }

    async putRequest(args: { [key:string]: string }, type: string, actionType: string) {
        const id = args[entityTypesPluralMap[type]];
        const body = {
            id: id,
            type: type
        }

        const favourites = await this.put(actionType, body);

        favourites.id = favourites._id;

        return favourites;
    }
}

export default FavouritesAPI;
