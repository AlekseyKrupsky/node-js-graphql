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

    async create(args: any, token: string) {
        const item = await this.post('', args, { headers: { Authorization: `${token}` }});

        item.id = item._id;

        return item;
    }

    async update(args: any, token: string) {
        const item = await this.put(args.id, args, { headers: { Authorization: `${token}` }});

        item.id = item._id;

        return item;
    }

    async remove(id: string, token: string) {
        return await this.delete(id, {}, { headers: { Authorization: `${token}` }});
    }
}

export default MusicifyAPI;
