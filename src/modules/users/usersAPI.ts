import { RESTDataSource } from "apollo-datasource-rest";

class UsersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.USERS_URL;
    }

    async find(id: string) {
        return this.get(encodeURIComponent(id));
    }
}

export default UsersAPI;
