import MusicianAPI from "../../musicianAPI";

class ArtistsAPI extends MusicianAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }
}

export default ArtistsAPI;
