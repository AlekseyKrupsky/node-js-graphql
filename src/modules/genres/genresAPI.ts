import MusicifyAPI from "../musicifyAPI";
import { CreateGenre } from "./resolvers";

class GenresAPI extends MusicifyAPI {
    constructor() {
        super();
        this.baseURL = process.env.GENRES_URL;
    }

    async create(args: CreateGenre, token: string) {
        const genre = await this.post('', args, { headers: { Authorization: `${token}` }});

        genre.id = genre._id;

        return genre;
    }

    async update(args: any, token: string) {
        const genre = await this.put(args.id, args, { headers: { Authorization: `${token}` }});

        genre.id = genre._id;

        return genre;
    }

    async remove(id: string, token: string) {
        return await this.delete(id, {}, { headers: { Authorization: `${token}` }});
    }
}

export default GenresAPI;
