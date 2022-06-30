import { RESTDataSource } from "apollo-datasource-rest";

class UsersAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.USERS_URL;
    }

    async find(id: string) {
        return this.get(encodeURIComponent(id));
    }

    async login(args: any) {
        return this.post('login', {
            email: args.email,
            password: args.password
        });
    }

    async register(args: any) {
        return this.post('register', {
            firstName: args.firstName,
            lastName: args.lastName,
            password: args.password,
            email: args.email
        });
    }

    async verify(jwt: string) {
        return this.post('verify', {}, { headers: { Authorization: `${jwt}` }});
    }
}

export default UsersAPI;
