import { typeDefs } from './ticket.type';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './ticket.resolver';

const ticketsGetSchema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: resolvers,
});

export default ticketsGetSchema;
