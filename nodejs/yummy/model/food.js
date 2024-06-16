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

    },

    addFood: (req, res) => {

        console.log(req.body)
        res.send('<h1>End of "addFood"</h1>')

    }

}