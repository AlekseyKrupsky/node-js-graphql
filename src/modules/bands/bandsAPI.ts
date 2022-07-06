import MusicianAPI from "../../musicianAPI";

class BandsAPI extends MusicianAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }
}

export default BandsAPI;
