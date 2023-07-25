import { getAvailableTicket } from '../../services/getAvaliableTicket';
import { Request, Response } from 'express';

export const getAvailableTicketsController = async (
  request: Request,
  response: Response,
) => {
  try {
    const { eventId } = request.params;
    const tickets = await getAvailableTicket(eventId);
    return response.json(tickets);
  } catch (err) {
    response.status(500).send('something was wrong');
  }
};
