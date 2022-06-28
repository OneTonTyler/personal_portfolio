// Controllers
const ContentController = require('./controllers/content.controller');

exports.routes_config = (app) => {
    app.get('/foo', [
        ContentController.list
    ]);

    app.post('/foo', [
        ContentController.insert
    ]);

    app.patch('/foo', [
        ContentController.patchById
    ]);

    app.delete('/foo', [
        ContentController.removeById
    ]);
};