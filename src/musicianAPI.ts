import TokenizedAPI from "./tokenizedAPI";
import { defaultEntity, fullEntity, microserviceEntity, newEntity } from "./types/entities";

class MusicianAPI extends TokenizedAPI {
    async find(id: string): Promise<fullEntity> {
        const item: microserviceEntity = await this.get(encodeURIComponent(id));

        item.id = item._id;

        return item;
    }

    async getAll(args: { limit: any, offset: any }): Promise<fullEntity[]> {
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
            throw new Error("Offset should be a number");
        }

        if (typeof args.limit === "number") {
            params.limit = args.limit;
        } else if (args.limit !== undefined) {
            throw new Error("Limit should be a number");
        }

        const result: { items: microserviceEntity[] } = await this.get('', params);

        result.items.map((item: microserviceEntity) => {
            item.id = item._id;
        });

        return result.items;
    }

    async create(args: newEntity): Promise<fullEntity> {
        const item: microserviceEntity = await this.post('', args);

        item.id = item._id;

        return item;
    }

    async update(args: defaultEntity): Promise<fullEntity> {
        const item: microserviceEntity = await this.put(args.id, args);

        item.id = item._id;

        return item;
    }

    async remove(id: string) {
        return await this.delete(id);
    }
}

export default MusicianAPI;
