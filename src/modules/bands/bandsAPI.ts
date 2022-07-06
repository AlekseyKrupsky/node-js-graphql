import MusicifyAPI from "../../musicifyAPI";

class BandsAPI extends MusicifyAPI {
    constructor() {
        super();
        this.baseURL = process.env.BANDS_URL;
    }
}

export default BandsAPI;
