import UsersAPI from "../modules/users/usersAPI";
import TracksAPI from "../modules/tracks/tracksAPI";
import GenresAPI from "../modules/genres/genresAPI";
import FavouritesAPI from "../modules/favourites/favouritesAPI";
import BandsAPI from "../modules/bands/bandsAPI";
import ArtistsAPI from "../modules/artists/artistsAPI";
import AlbumsAPI from "../modules/albums/albumsAPI";

export type Context = {
    dataSources: {
        usersAPI: UsersAPI,
        tracksAPI: TracksAPI,
        genresAPI: GenresAPI,
        favouritesAPI: FavouritesAPI,
        bandsAPI: BandsAPI,
        artistsAPI: ArtistsAPI,
        albumsAPI: AlbumsAPI,
    }
}
