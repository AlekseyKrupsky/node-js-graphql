import TokenizedAPI from "./tokenizedAPI";

class MusicianAPI extends TokenizedAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
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

        if (typeof args.offset === "number") {
            params.offset = args.offset;
        } else if (args.offset !== undefined) {
            return { error: "Offset should be a number" };
        }

        if (typeof args.limit === "number") {
            params.limit = args.limit;
        } else if (args.limit !== undefined) {
            return { error: "Limit should be a number" };
        }

        const result = await this.get('', params);

        result.items.map((item: any) => {
            item.id = item._id;
        });

        return result.items;
    }

    async create(args: any) {
        const item = await this.post('', args);

        item.id = item._id;

        return item;
    }

    async update(args: any) {
        const item = await this.put(args.id, args);

        item.id = item._id;

        return item;
    }

    async remove(id: string) {
        return await this.delete(id);
    }
}

export default MusicianAPI;
