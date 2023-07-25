import { getAvailableTicket } from '../services/getAvaliableTicket';

export const resolvers = {
  Query: {
    getTickets: async (_: any, { eventId }: { eventId: string }) => {
      const tickets = await getAvailableTicket(eventId);
      return tickets;
    },
  },
};
