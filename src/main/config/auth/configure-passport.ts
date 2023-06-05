import passport from 'passport';
import bcrypt from 'bcrypt';
import {Strategy as LocalStrategy} from 'passport-local';
import {HydratedDocument, Model} from 'mongoose';
import {User} from '../../models/User';
import bunyan from 'bunyan';

/**
 * Passport configuration.
 * @param {bunyan} logger used for logging
 * @param UserModel user model used to represent logged-in user
 */
export const configurePassport =
    (logger: bunyan, UserModel: Model<User>): passport.PassportStatic => {
      logger.info('Configuring passport with provided user model');
      passport.use(
          new LocalStrategy(async (username, password, done) => {
            try {
              const foundUser: HydratedDocument<User> =
                        await UserModel.findOne({
                          email: username,
                        });

              if (!foundUser) {
                return done(null, false, {message: 'Invalid username'});
              }

              if (!foundUser.emailVerified) {
                return done(null, false, {
                  message: 'User\'s email not verified',
                });
              }

              const validPassword = await bcrypt.compare(
                  password,
                  foundUser.password,
              );
              if (!validPassword) {
                return done(null, false, {message: 'Invalid password'});
              }

              return done(null, foundUser);
            } catch (err) {
              if (err) return done(err);
            }
          }),
      );

      passport.serializeUser((user: HydratedDocument<User>, done) => {
        done(null, user.id);
      });

      passport.deserializeUser((id, done) => {
        UserModel.findById(id, (err: any, user: User) => {
          done(err, user);
        });
      });

      return passport;
    };
