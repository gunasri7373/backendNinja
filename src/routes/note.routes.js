const router = require('express').Router();

const verifyUser = require("../middlewares/authentication")

const fileUpload = require("../middlewares/upload")

const noteController = require('../controllers/note.controller');

router.post('/', fileUpload.single('file'), verifyUser, noteController.createOrUpdateNote);

router.delete('/:noteId', verifyUser, noteController.deleteNote);

router.get('/:noteId', verifyUser, noteController.getById);

router.get('/', verifyUser, noteController.getAll);

module.exports = router;
