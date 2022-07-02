// Controllers
const ContentController = require('./controllers/content.controller');

exports.routes_config = (app) => {
    app.get('/api', [
        ContentController.getById
    ]);

    app.post('/api', [
        ContentController.insert
    ]);

    app.patch('/api', [
        ContentController.patchById
    ]);

    app.delete('/api', [
        ContentController.removeById
    ]);
};