const elephant = require('../models/elephant');
var Elephant = require('../models/elephant');
//module.exports = mongoose.model("Elephant", elephantSchema)

// List of all Elephants
exports.elephant_list = async function (req, res) {
    try {
        theElephants = await Elephant.find();
        res.send(theElephants);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific Elephant.
exports.elephant_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Elephant.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
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
exports.elephant_view_all_Page = async function (req, res) {
    try {
        theElephants = await elephant.find();
        res.render('elephant', { title: 'Elephant Search Results', results: theElephants });
    } catch (err) {
        res.send(`{"error": ${err}}`)
        res.status(500);
    }
};
// Handle Elephant delete on DELETE.
exports.elephant_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Elephant.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle Elephant update form on PUT.
exports.elephant_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Elephant.findById(req.params.id)
        // Do updates of properties
        if (req.body.Name)
            toUpdate.Name = req.body.Name;
        if (req.body.Cost) toUpdate.Cost = req.body.Cost;
        if (req.body.Weight) toUpdate.Weight = req.body.Weight;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};

// Handle a show one view with id specified by query
exports.elephant_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Elephant.findById(req.query.id)
        res.render('elephantdetail',
            { title: 'Elephant Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
    }
};
// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.elephant_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('elephantcreate', { title: 'Elephant Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};