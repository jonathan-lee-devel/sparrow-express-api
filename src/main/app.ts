import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import {configureExpressSession} from './config/auth/configure-express-session';
import {configurePassport} from './config/auth/configure-passport';
import {configureCors} from './config/auth/configure-cors';
import {connectToDatabase} from './config/database/connect-to-database';
import {loggerConfig} from './config/logger/logger-config';
import {UserModel} from './models/User';
import {AuthRouter} from './routes';
import {RegistrationRouter} from '../registration/routes';
import {PasswordResetRouter} from '../password/routes';
import {ProfileRouter} from '../profile/routes';
import {OrganizationsRouter} from '../organizations/routes';
import {NotificationsRouter} from '../notifications/routes';
import {DeliveriesRouter} from '../deliveries/routes';

const logger = loggerConfig();

const app = express();
app.use(helmet.hidePoweredBy());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(configureExpressSession(logger));

const passport = configurePassport(logger, UserModel);
app.use(passport.initialize());
app.use(passport.session());

app.use(configureCors(logger));

connectToDatabase(logger);

app.use('/auth', AuthRouter);
app.use('/register', RegistrationRouter);
app.use('/password', PasswordResetRouter);
app.use('/profile', ProfileRouter);
app.use('/organizations', OrganizationsRouter);
app.use('/notifications', NotificationsRouter);
app.use('/deliveries', DeliveriesRouter);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use(
    (
        err: { message: string; status: string },
        req: any,
        res: {
            locals: { message: any; error: any };
            status: (arg0: any) => void;
            json: (arg0: { error: any }) => void;
        },
        _: any,
    ) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      logger.error(
          `Error at ${req.url}: {"status":"${err.status}", "message":"${err.message}"}`,
      );
      res.status(err.status || 500);
      res.json({error: err});
    },
);

export {app};
