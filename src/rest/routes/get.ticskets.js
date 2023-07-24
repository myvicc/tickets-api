import { Router } from 'express';
import {getAvailableTicketsController} from "../controllers/tickets.controller.js";

const router = new Router();

router.get(`/api/data/:eventId`,   getAvailableTicketsController);

export default     router;