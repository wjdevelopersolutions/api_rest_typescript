import { Router } from 'express';
const router = Router();

import passport from 'passport';

router.get('/api/special', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.json({
        message: 'Special page success!'
    })
})

export default router;