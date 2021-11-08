var Elephant = require('../models/elephant');
//module.exports = mongoose.model("Elephant", elephantSchema)


// List of all Elephants
exports.elephant_list = function(req, res) {
res.send('NOT IMPLEMENTED: Elephant list');
};
// for a specific Elephant.
exports.elephant_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Elephant detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.elephant_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Elephant create POST');
};
// Handle Costume delete form on DELETE.
exports.elephant_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Elephant delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.elephant_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Elephant update PUT' + req.params.id);
};