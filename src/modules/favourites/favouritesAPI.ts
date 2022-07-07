import TokenizedAPI from "../../tokenizedAPI";
import { Entity, EntityPlural } from "../../enums/entityTypes";

type Etest = Entity.TRACK | Entity.BAND | Entity.ARTIST | Entity.GENRE | Entity.FAVOURITE | Entity.USER | Entity.ALBUM;
// export type Etest2 = EntityPlural.TRACKS | EntityPlural.BANDS | EntityPlural.ARTISTS | EntityPlural.GENRES | EntityPlural.USERS | EntityPlural.FAVOURITES | EntityPlural.ALBUMS;
export type Etest2 = "bands" | "artists" | "genres" | "tracks" | "users" | "favourites" | "albums";

type Status = Partial<Record<Etest, string>>

type myType = Partial<Record<keyof typeof Entity, string>>;

const EntityPluralPluralMap: {
    [key in Etest2]: Etest
} = {
    [EntityPlural.TRACKS]: Entity.TRACK,
    [EntityPlural.BANDS]: Entity.BAND,
    [EntityPlural.ARTISTS]: Entity.ARTIST,
    [EntityPlural.GENRES]: Entity.GENRE,
    [EntityPlural.FAVOURITES]: Entity.FAVOURITE,
    [EntityPlural.ALBUMS]: Entity.ALBUM,
    [EntityPlural.USERS]: Entity.USER,
}

class FavouritesAPI extends TokenizedAPI {
    constructor(token: string, baseURL: string) {
        super(token, baseURL);
    }

    async getAll() {
        const favourites = await this.get('');

        favourites.id = favourites._id;

        return favourites;
    }

    async putRequest(args: { [key:string]: string }, type: Etest2, actionType: string) {
        const id: string = args[EntityPluralPluralMap[type]];
        const body: {
            id: string,
            type: string
        } = {
            id: id,
            type: type
        }

        const favourites = await this.put(actionType, body);

        favourites.id = favourites._id;

        return favourites;
    }
}

export default FavouritesAPI;
