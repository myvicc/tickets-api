import { getAvailableTicket } from "../../services/getAvaliableTicket.js";

export const getAvailableTicketsController = async (request, response) => {
    try {
        const { eventId } = request.params;
        console.log('api/data/eventId', eventId)
        const tickets = await getAvailableTicket(eventId);
        return response.json(tickets);
    } catch (err) {
        response.status(500).send('something was wrong')
    }
}