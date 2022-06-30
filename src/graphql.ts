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

export const run = async () => {
    const typeDefs = await loadSchema('./src/modules/**/*.graphql', {
        loaders: [new GraphQLFileLoader()]
    });

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
            bandsResolvers.Mutation
        ),
        Album: albumResolvers.Album,
        Artist: artistResolvers.Artist,
        Band: bandsResolvers.Band,
        Track: tracksResolvers.Track,
        Favourites: favouritesResolvers.Favourites,
        Member: bandsResolvers.Member
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        dataSources: () => {
            return {
                artistsAPI: new ArtistsAPI(),
                albumsAPI: new AlbumsAPI(),
                genresAPI: new GenresAPI(),
                bandsAPI: new BandsAPI(),
                usersAPI: new UsersAPI(),
                tracksAPI: new TracksAPI(),
                favouritesAPI: new FavouritesAPI(),
            }
        },
        context: ({ req }) => {
            const token = req.headers.authorization || '';

            return { token };
        }
    });

    server.listen({ port: process.env.PORT }).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}
