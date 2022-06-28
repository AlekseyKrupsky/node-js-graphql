import { RESTDataSource } from "apollo-datasource-rest";

class FavouritesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.FAVOURITES_URL;
    }

    async getAll() {
        return this.get('');
    }
}

export default FavouritesAPI;
