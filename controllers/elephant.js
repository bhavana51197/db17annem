const elephant = require('../models/elephant');
var Elephant = require('../models/elephant');
//module.exports = mongoose.model("Elephant", elephantSchema)

// List of all Elephants
exports.elephant_list = async function (req, res) {
    try {
        theElephants = await elephants.find();
        res.send(theElephants);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific Elephant.
exports.elephant_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Elephant detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.elephant_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Elephant();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.Name = req.body.Name;
    document.Cost = req.body.Cost;
    document.Weight = req.body.Weight;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// VIEWS
// Handle a show all view
exports.elephant_view_all_Page = async function(req, res) {
    try {
        theElephants = await elephant.find();
        res.render('elephant', { title: 'Elephant Search Results', results: theElephants });
    } catch (err) {
        res.send(`{"error": ${err}}`)
        res.status(500);
    }
};
// Handle Costume delete form on DELETE.
exports.elephant_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Elephant delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.elephant_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Elephant update PUT' + req.params.id);
};

