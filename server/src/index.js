import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import passport from 'passport';
import { jwtLogin } from './services/jwtStrategy.js';
import { passportLogin } from './services/localStrategy.js';

import routes from './routes/index.js';

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(jwtLogin);
passport.use(passportLogin);


const isProduction = process.env.NODE_ENV === 'production';

// DB Config
const dbConnection = isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

// Connect to Mongo
mongoose
  .connect(dbConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

// Use Routes
app.use('/', routes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

