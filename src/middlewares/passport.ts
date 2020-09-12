import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import config from '../config/config';
import User from '../models/users';


const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtsecret
}

export default new Strategy(opts, async (payload, done) => {

    try {
        let user = await User.findById({ _id: payload.id });
        if ( user ) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(`${error}`);
    }
    
});