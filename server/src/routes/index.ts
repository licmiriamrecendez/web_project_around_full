import { Router } from 'express';
import { usersRouter } from './users.js';
import { cardsRouter } from './cards.js';
import { createUser, login} from '../controllers/users.js';

const router = Router();

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

export default router;