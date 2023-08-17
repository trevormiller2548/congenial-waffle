const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Sequelize } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import models
const BlogPost = require('./models/BlogPost'); // Import BlogPost model
const Comment = require('./models/Comment');   // Import Comment model
const User = require('./models/User');         // Import User model
const { withAuth } = require('./utils/auth');
const { formatDate } = require('./utils/helper');
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SESSION_SECRET || 'Super secret secret',
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({
    helpers: {
        formatDate: (date) => {
            const formattedDate = new Date(date);
            const month = formattedDate.getMonth() + 1;
            const day = formattedDate.getDate();
            const year = formattedDate.getFullYear();
            return `${month}/${day}/${year}`;
        },
    },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

passport.use(
    new LocalStrategy(async (username, password, done) => {
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
    })
);

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

app.use('/', homeController);
app.use('/user', withAuth, userController);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
