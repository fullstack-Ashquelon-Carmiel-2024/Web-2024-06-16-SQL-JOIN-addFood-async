const cuisine = require('./cuisine');

module.exports = {

    getAddPage: (req, res) => {

        cuisine.getCuisineList((err,result) => {

            if (err) {
                return res.status(500).send(err.message);
            }

            res.render('add-food.ejs', {
                title: 'Add | Yummy',
                message: '',
                cuisines: result
            })

        })

    }

}