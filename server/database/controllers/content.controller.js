// Models
const ContentModel = require('../model/content.model');

// Connect to database
ContentModel.connect();

// Insert a new project or blog post
exports.insert = async (req, res) => {
    const table_name = req.body.table;
    const columns = req.body.cols;
    const values = req.body.values;
    const id = req.body.id;

    await ContentModel.newEntry(table_name, columns, values, id)
        .then(results => {
            res.status(201).send({message: results});
        })
        .catch(err => {
            res.status(400).send({errorMessage: err});
        });
};

// List all entries
exports.list = async (req, res) => {
    const table_name = req.query.table;

    await ContentModel.getByTable(table_name)
        .then(results => {
            res.status(200).send({message: results});
        })
        .catch(err => {
            res.status(400).send({errorMessage: err});
        });
};

exports.getById = async (req, res) => {
    const table_name = req.query.table;
    const id = req.query.id;

    await ContentModel.getById(table_name, id)
        .then(results => {
            res.status(200).send({message: results});
        })
        .catch(err => {
            res.status(400).send({errorMessage: err});
        });
};

// Update selected entry
exports.patchById = async (req, res) => {
    const table_name = req.body.table;
    const cols = req.body.cols;
    const values = req.body.values;
    const id = req.body.id;

    await ContentModel.patchById(table_name, cols, values, id)
        .then(results => {
            res.status(200).send({message: results});
        })
        .catch(err => {
            res.status(400).send({errorMessage: err});
        });
};

// Delete selected entry
exports.removeById = async (req, res) => {
    const table_name = req.body.table;
    const id = req.body.id;

    await ContentModel.removeById(table_name, id)
        .then(results => {
            res.status(200).send({message: results});
        })
        .catch(err => {
            res.status(400).send({errorMessage: err});
        });
};

// Delete all entries in table
exports.clearTable = async (req, res) => {
    const table_name = req.body.table;

    await ContentModel.clearTable(table_name)
        .then(results => {
            res.status(200).send({message: results});
        })
        .catch(err => {
            res.status(400).send({errorMessage: err})
        });
};