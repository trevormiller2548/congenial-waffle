const { formatDate } = require('../utils/helper');

module.exports = {
    index: (req, res) => {
        // Your logic for rendering the home page
        res.render('home', { formattedDate: formatDate(new Date()) });
    }
};
