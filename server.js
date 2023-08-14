const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const Sequelize = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User, BlogPost, Comment } = require('./models'); // Update with your models

const app = express();
const PORT = process.env.PORT || 3001;

// Sequelize connection
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Update with your DB host
  port: 3306, // Update with your DB port
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: process.env.SESSION_SECRET || 'Super secret secret',
  cookie: { maxAge: 3600000 }, // Set session expiration (1 hour)
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./app/controllers')); // Update with your controllers

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
