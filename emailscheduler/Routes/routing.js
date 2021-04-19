const express = require('express');

const routing = express.Router();
const notesController = require('../Controller/myNotes');

routing.post('/create', notesController.createschedule);

routing.get('/read', notesController.getallschedule);

routing.put('/update', notesController.updateschedule);

routing.get('/listfailed', notesController.getfailedschedule);

routing.delete('/delete', notesController.deleteschedule);

routing.all('*', notesController.invalid);

module.exports = routing;
