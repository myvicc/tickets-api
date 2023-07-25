import { Router } from 'express';
import { getAvailableTicketsController } from '../controllers/tickets.controller';

const router: Router = Router();

router.get(`/api/data/:eventId`, getAvailableTicketsController);

export default router;
