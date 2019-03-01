import passport from 'passport';
import User from './services/user/model';
import config from './config';

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	User.findById(jwt_payload.id)
		.then(user => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		})
		.catch(err => console.log(err));
})
);

export default passport;