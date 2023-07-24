import { typeDefs } from './ticket.type.js';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './ticket.resolver.js';

const ticketsGetSchema = makeExecutableSchema({
    typeDefs: [typeDefs],
    resolvers: resolvers,
});

export default ticketsGetSchema;