import { RESTDataSource } from "apollo-datasource-rest";

class Artists extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.ARTISTS_URL;
        console.log(this.baseURL);
    }

    async find(id: string) {
        console.log(this.get(encodeURIComponent(id)));

        return this.get(encodeURIComponent(id));
    }

    async getAll() {
        return this.get('');
    }
}

export default Artists;