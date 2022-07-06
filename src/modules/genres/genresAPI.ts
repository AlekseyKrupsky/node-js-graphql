import MusicianAPI from "../../musicianAPI";

class GenresAPI extends MusicianAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }
}

export default GenresAPI;
