import { ApolloServer } from "apollo-server";
import { resolvers as artistResolvers } from "./modules/artists/resolvers";
import { resolvers as albumResolvers } from "./modules/albums/resolvers";
import { resolvers as bandsResolvers } from "./modules/bands/resolvers";
import { resolvers as genresResolvers } from "./modules/genres/resolvers";
import { resolvers as usersResolvers } from "./modules/users/resolvers";
import { resolvers as tracksResolvers } from "./modules/tracks/resolvers";
import { resolvers as favouritesResolvers } from "./modules/favourites/resolvers";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import ArtistsAPI from "./modules/artists/artistsAPI";
import AlbumsAPI from "./modules/albums/albumsAPI";
import GenresAPI from "./modules/genres/genresAPI";
import BandsAPI from "./modules/bands/bandsAPI";
import UsersAPI from "./modules/users/usersAPI";
import TracksAPI from "./modules/tracks/tracksAPI";
import FavouritesAPI from "./modules/favourites/favouritesAPI";

export const run = () => {
    loadSchema('./src/modules/**/*.graphql', {
        loaders: [new GraphQLFileLoader()]
    }).then((typeDefs) => {
        const resolvers = {
            Query: Object.assign(
                {},
                artistResolvers.Query,
                albumResolvers.Query,
                bandsResolvers.Query,
                genresResolvers.Query,
                usersResolvers.Query,
                tracksResolvers.Query,
                favouritesResolvers.Query
            ),
            Mutation: Object.assign(
                {},
                usersResolvers.Mutation,
                genresResolvers.Mutation,
                bandsResolvers.Mutation,
                artistResolvers.Mutation,
                tracksResolvers.Mutation,
                albumResolvers.Mutation,
                favouritesResolvers.Mutation
            ),
            Album: albumResolvers.Album,
            Artist: artistResolvers.Artist,
            Band: bandsResolvers.Band,
            Track: tracksResolvers.Track,
            Favourites: favouritesResolvers.Favourites,
            Member: bandsResolvers.Member
        };

        let token: string;

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            csrfPrevention: true,
            cache: 'bounded',
            dataSources: () => {
                if (!(
                    process.env.ARTISTS_URL
                    && process.env.ALBUMS_URL
                    && process.env.GENRES_URL
                    && process.env.BANDS_URL
                    && process.env.USERS_URL
                    && process.env.TRACKS_URL
                    && process.env.FAVOURITES_URL
                )) {
                    console.log('Microservices URL aren\'t set.');
                    process.exit(1);
                }

                return {
                    artistsAPI: new ArtistsAPI(token, process.env.ARTISTS_URL),
                    albumsAPI: new AlbumsAPI(token, process.env.ALBUMS_URL),
                    genresAPI: new GenresAPI(token, process.env.GENRES_URL),
                    bandsAPI: new BandsAPI(token, process.env.BANDS_URL),
                    usersAPI: new UsersAPI(token, process.env.USERS_URL),
                    tracksAPI: new TracksAPI(token, process.env.TRACKS_URL),
                    favouritesAPI: new FavouritesAPI(token, process.env.FAVOURITES_URL),
                }
            },
            context: ({ req }) => {
                token = req.headers.authorization || '';
            }
        });

        server.listen({ port: process.env.PORT }).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    });
}
