const cuisine = require('./cuisine');

module.exports = {

    message: '',

    getAddPage: (req, res) => {

        cuisine.getCuisineList((err,result) => {

            if (err) {
                return res.status(500).send(err.message);
            }

            res.render('add-food.ejs', {
                title: 'Add | Yummy',
                message: module.exports.message,
                cuisines: result
            })

        })

    },

    addFood: (req, res) => {

        console.log(req.body)

        // Check if there was smth wrong while uploading the file
        // If it was, change the "message" property of the current module
        // and show the "add food" page again (with the message)
        if (!req.files) {

            module.exports.message = 'No file was uploaded';
            return res.redirect('/add');

        }

        let foodName = req.body.foodName;
        let cuisineId = +req.body.cuisine;
        let calories = req.body.calories ? +req.body.calories : null;
        let prepareTimeMin = +req.body.prepareTimeMin;
        let ingredients = req.body.ingredients;
        // CHOICE OPERATOR || - if we've got a value we use it, if not we want it to be "null"
        let typeOfDish = req.body.typeOfDish || null;
        let kosherType = req.body.kosherType || null;

        // req.files.image - because in the upload field
        //                   there is name="image"
        let image = req.files.image;

        // Show some file metadata:
        console.log(`image.name: ${image.name}`)
        console.log(`image.mimetype: ${image.mimetype}`)

        res.send('<h1>End of "addFood"</h1>')

    }

}