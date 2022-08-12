// Controllers
const ContentController = require('./controllers/content.controller');

exports.routes_config = (app) => {
    app.get('/api', [
        ContentController.getById
    ]);

    app.get('/api/list_all', [
        ContentController.list
    ]);

    app.post('/api', [
        ContentController.insert
    ]);

    app.put('/api', [
        ContentController.putById
    ]);

    app.post('/api/render', [
        ContentController.insert
    ]);

    app.patch('/api', [
        ContentController.patchById
    ]);

    app.delete('/api', [
        ContentController.removeById
    ]);

    app.delete('/api/render', [
        ContentController.clearTable
    ]);
};