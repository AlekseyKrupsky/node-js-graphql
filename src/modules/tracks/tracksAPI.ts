import MusicifyAPI from "../../musicifyAPI";

class TracksAPI extends MusicifyAPI {
    constructor() {
        super();
        this.baseURL = process.env.TRACKS_URL;
    }
}

export default TracksAPI;
