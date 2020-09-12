import { Router } from 'express';
import { use } from 'passport';
const router = Router();

import { signin, signup } from '../controllers/user.controller';

router.post('/api/session/signin', signin);
router.post('/api/session/signup', signup);


export default router;