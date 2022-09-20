import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

import dbConnection from "./db/connection";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const startServer = async () => {
    try {
        await dbConnection();
        const app = express();
        app.use(cors())

        const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        });

        await server.start();
        server.applyMiddleware({ app });

        app.use((req, res) => {
        res.status(200);
        res.send("Welcome Todo App");
        res.end();
        });

        await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    } catch (err) {
        console.log(err)
    }
};

startServer();
