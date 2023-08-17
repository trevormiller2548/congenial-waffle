const { withAuth } = require('../utils/auth');
const User = require('../models/User');

module.exports = {
    profile: [withAuth, (req, res) => {
        // Your logic for rendering the user's profile
        res.render('profile');
    }],
    // Other user-related controller actions
};
