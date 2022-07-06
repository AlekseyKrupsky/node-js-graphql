import TokenizedAPI from "./tokenizedAPI";

export type microserviceEntity = {
    _id: string,
    [key: string]: any
}

type newEntity = {
    [key: string]: any
}

export type defaultEntity = {
    id: string,
    [key: string]: any
}

class MusicianAPI extends TokenizedAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }

    async find(id: string): Promise<defaultEntity | microserviceEntity> {
        const item: microserviceEntity = await this.get(encodeURIComponent(id));

        item.id = item._id;

        return item;
    }

    async getAll(args: { limit: any, offset: any }): Promise<any> {
        let params: {
            limit: number,
            offset: number
        } = {
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

        result.items.map((item: microserviceEntity) => {
            item.id = item._id;
        });

        return result.items;
    }

    async create(args: newEntity): Promise<defaultEntity | microserviceEntity> {
        const item: microserviceEntity = await this.post('', args);

        item.id = item._id;

        return item;
    }

    async update(args: defaultEntity): Promise<defaultEntity | microserviceEntity> {
        const item: microserviceEntity = await this.put(args.id, args);

        item.id = item._id;

        return item;
    }

    async remove(id: string) {
        return await this.delete(id);
    }
}

export default MusicianAPI;
