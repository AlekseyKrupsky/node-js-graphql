import MusicifyAPI from "../../musicifyAPI";

class GenresAPI extends MusicifyAPI {
    constructor() {
        super();
        this.baseURL = process.env.GENRES_URL;
    }
}

export default GenresAPI;
