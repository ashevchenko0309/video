import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDao } from "../dao/index"

import passportConfig from "../config/passport"

const applyPassportStrategy = (passport: any) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: passportConfig.secret
  };
  passport.use(
    new Strategy(options, (payload, done) => {
      UserDao.getUserByEmail(payload.email)
        .then((user) => {
          if (user) {
            const { id, email, role, nickname } = user
            return done(null, {
              id,
              email,
              nickname,
              role,
            })
          }

          return done(null, false)
        })
        .catch((error) => {
          console.error(error)
          done(error, false)
        })
    })
  );
};

export default applyPassportStrategy