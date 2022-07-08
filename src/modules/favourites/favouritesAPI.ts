import TokenizedAPI from "../../tokenizedAPI";
import { Entity, EntityPlural } from "../../enums/entityTypes";
import { EntityPluralUnion, EntityUnion } from "../../types/entityTypes";

const EntityPluralMap: {
    [key in EntityPlural]: EntityUnion
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
    async getAll() {
        const favourites = await this.get('');

        favourites.id = favourites._id;

        return favourites;
    }

    async putRequest(args: { [key:string]: string }, type: EntityPluralUnion, actionType: string) {
        const id: string = args[EntityPluralMap[type]];
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
