import MusicifyAPI from "../musicifyAPI";
import { CreateBand } from "./resolvers";

class BandsAPI extends MusicifyAPI {
    constructor() {
        super();
        this.baseURL = process.env.BANDS_URL;
    }

    async create(args: CreateBand, token: string) {
        const band = await this.post('', args, { headers: { Authorization: `${token}` }});

        band.id = band._id;

        return band;
    }

    async update(args: any, token: string) {
        const band = await this.put(args.id, args, { headers: { Authorization: `${token}` }});

        band.id = band._id;

        return band;
    }
}

export default BandsAPI;
