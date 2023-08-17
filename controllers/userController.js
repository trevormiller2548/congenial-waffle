const express = require('express');
const router = express.Router();

const { User, BlogPost, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: BlogPost,
                    attributes: ['id', 'title', 'description', 'date'],
                },
            ],
        });

        const userData = user.get({ plain: true });

        res.render('dashboard', {
            ...userData,
            loggedIn: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Add other routes and controllers as needed

module.exports = router;
