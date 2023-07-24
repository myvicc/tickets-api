import { getAvailableTicket } from "../services/getAvaliableTicket.js";

export const resolvers = {
    Query: {
        getTickets: async (_, { eventId }) => {
            const tickets = await getAvailableTicket(eventId);
            return tickets;
        }
    }
}