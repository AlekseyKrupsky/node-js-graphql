import MusicianAPI from "../../musicianAPI";

class AlbumsAPI extends MusicianAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }
}

export default AlbumsAPI;
