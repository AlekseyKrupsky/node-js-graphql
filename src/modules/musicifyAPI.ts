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

    async remove(id: string, token: string) {
        return await this.delete(id, {}, { headers: { Authorization: `${token}` }});
    }
}

export default MusicifyAPI;
