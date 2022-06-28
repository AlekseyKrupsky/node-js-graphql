import MusicifyAPI from "../musicifyAPI";

class AlbumsAPI extends MusicifyAPI {
    constructor() {
        super();
        this.baseURL = process.env.ALBUMS_URL;
    }
}

export default AlbumsAPI;
