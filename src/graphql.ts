import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./modules/artists/resolvers";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";



// console.log(process.env.ARTISTS_URL);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export const run = async () => {
    const typeDefs = await loadSchema('./src/modules/**/*.graphql', {
        loaders: [new GraphQLFileLoader()]
    });

// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//
//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }
//
//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
// #  type Query {
// #    books: [Book]
// #  }
// `;

// const books = [
//     {
//         title: 'The Awakening',
//         author: 'Kate Chopin',
//     },
//     {
//         title: 'City of Glass',
//         author: 'Paul Auster',
//     },
// ];

// const resolvers = {
//     Query: {
//         books: () => books,
//     },
// };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
    });

// The `listen` method launches a web server.
    server.listen({ port: process.env.PORT }).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}
