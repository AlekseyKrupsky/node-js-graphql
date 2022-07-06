import TokenizedAPI from "../../tokenizedAPI";

class UsersAPI extends TokenizedAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }

    async find(id: string) {
        return this.get(encodeURIComponent(id));
    }

    async login(args: { email: string, password: string }) {
        return this.post('login', args);
    }

    async register(args: { firstName: string, lastName: string, email: string, password: string }) {
        return this.post('register', args);
    }

    async verify() {
        return this.post('verify');
    }
}

export default UsersAPI;
