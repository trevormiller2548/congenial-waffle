const express = require('express');
const router = express.Router();

const { BlogPost, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        // Fetch and render blog posts
        const blogPosts = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['text', 'date', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        const posts = blogPosts.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.logged_in });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Add other routes and controllers as needed

module.exports = router;
