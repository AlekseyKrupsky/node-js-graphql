import { RESTDataSource } from "apollo-datasource-rest";

class UsersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.USERS_URL;
    }

    async find(id: string) {
        return this.get(encodeURIComponent(id));
    }

    async login(args: { email: string, password: string }) {
        return this.post('login', args);
    }

    async register(args: { firstName: string, lastName:string, email: string, password: string }) {
        return this.post('register', args);
    }

    async verify(token: string) {
        return this.post('verify', {}, { headers: { Authorization: `${token}` }});
    }
}

export default UsersAPI;
