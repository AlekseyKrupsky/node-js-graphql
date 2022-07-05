import { RESTDataSource } from "apollo-datasource-rest";

class MusicifyAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async find(id: string) {
        const item = await this.get(encodeURIComponent(id));

        item.id = item._id;

        return item;
    }

    async getAll(args: any) {
        let params = {
            limit: 5,
            offset: 0
        }

        if (args.offset && typeof args.offset === "number") {
            params.offset = args.offset;
        }

        if (args.limit && typeof args.limit === "number") {
            params.limit = args.limit;
        }

        const result = await this.get('', params);

        result.items.map((item: any) => {
            item.id = item._id;
        });

        return result.items;
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
