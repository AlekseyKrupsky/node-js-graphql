import { RESTDataSource } from "apollo-datasource-rest";

class MusicifyAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async find(id: string) {
        return this.get(encodeURIComponent(id));
    }

    async getAll() {
        return this.get('');
    }
}

export default MusicifyAPI;
