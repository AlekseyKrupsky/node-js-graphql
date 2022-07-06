import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

class TokenizedAPI extends RESTDataSource {
    private readonly token;

    constructor(token: string, baseURL: string) {
        super();
        this.baseURL = baseURL;
        this.token = token;
    }

    protected willSendRequest(request: RequestOptions) {
        request.headers.set('Authorization', this.token);
    }
}

export default TokenizedAPI;
