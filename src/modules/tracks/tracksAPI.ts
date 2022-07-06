import MusicianAPI from "../../musicianAPI";

class TracksAPI extends MusicianAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }
}

export default TracksAPI;
