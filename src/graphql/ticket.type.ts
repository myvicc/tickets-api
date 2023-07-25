import { gql } from 'apollo-server-express';

export const typeDefs = gql `
    type Ticket {
    section: String
    row: String
    seatNumber: String
    price: String
    }
    
    type Query {
    getTickets(eventId: String!): [Ticket]
    }
`