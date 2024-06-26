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
        // console.log(`image.name: ${image.name}`)
        // console.log(`image.mimetype: ${image.mimetype}`)
        /* image.name: sabich.jpg
            image.mimetype: image/jpeg
            */

        let extension = image.mimetype.split('/')[1];

        if (!/^(gif|heic|jpeg|jpg|png|svg|webp)$/.test(extension)) {

            module.exports.message = `Wrong file extension: ${extension}`;
            return res.redirect('/add');

        }

        let imageName = `${foodName}.${extension}`;

        let querySQL = `SELECT * FROM food WHERE name = '${foodName}'`;

        db.query(querySQL,(err,result) => {

            if (err) {
                return res.status(500).send(`<h1>ERROR ${err.message}\n
                while performing\n
                ${querySQL}</h1>`);
            }

    
            if (result.length > 0) {

                module.exports.message = `Food named ${foodName} is already exist`;
                return res.redirect('/add');

            }

            querySQL = `INSERT INTO food (name,kosher_type,cuisine_id,
                image, calories, prepare_time_min, ingredients,  type_of_dish)
            VALUES ('${foodName}','${kosherType}',${cuisineId},'${imageName}',
            ${calories},${prepareTimeMin},'${ingredients}','${typeOfDish}')`;

            db.query(querySQL,(err) => {

                if (err) {
                    return res.status(500).send(`<h1>ERROR ${err.message}\n
                    while performing\n
                    ${querySQL}</h1>`);
                }
                // mv() - puts the file to some place in the disk
                image.mv(`static/assets/img/${imageName}`,(err) => {

                    if (err) {
                        // t.b.d. - delete the row from the database
                        // `DELETE FROM food WHERE name = ${foodName}`
                        return res.status(500).send(`<h1>ERROR ${err.message}\n
                                while performing mv() of \n
                                static/assets/img/${imageName}</h1>`);
                    }

                    res.redirect('/');

                }) // end of image.mv()

            }) // end of db.query('INSERT ...')

            
        }) // end of db.query('SELECT ...')
        

    } // end of addFood()

}