import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

dotenv.config();

const PORT = process.env.PORT || 8080
const MONGODB_URL = process.env.MONGODB_URL

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const database = mongoose.connection;

database.on('error', (error) => {
    console.log("An error occured while trying to connect to the database", error)
})

database.once('connected', () => {
    console.log("🐣  Successful database connection");
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
});

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Server is ready at ${url}\n📭  Query at https://studio.apollographql.com/dev`)
});
