import MusicifyAPI from "../musicifyAPI";

class ArtistsAPI extends MusicifyAPI {
    constructor() {
        super();
        this.baseURL = process.env.ARTISTS_URL;
    }
}

export default ArtistsAPI;
