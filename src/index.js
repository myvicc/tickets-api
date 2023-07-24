import express from "express";
import http from 'http';
import { ApolloServer } from '@apollo/server'
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors';
import bodyParser from 'body-parser';
import {typeDefs} from "./graphql/ticket.type.js";
import {resolvers} from "./graphql/ticket.resolver.js";
import router from './rest/routes/get.ticskets.js'
const port = 3040;
async function bootstrap() {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({httpServer})]});
    await server.start();
    app.use(cors())
    app.use(bodyParser.json())
    app.use('/gql', cors(), expressMiddleware(server))
    app.use('/', router);

    await httpServer.listen(port);
    console.log('server ready')
}
bootstrap().catch((err) => console.log(err))