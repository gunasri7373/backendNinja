const constants = require("../utilities/constants");
const mongoose = require('mongoose');
const Note = require("../models/note.model");
var fs = require('fs');

exports.createOrUpdateNote = async (req, res) => {
  try {
    const note = req.body;
    note.userAuthId = req.userAuthId
    note.userId = req.userprofileId
    if (req.file) {
      note.file = req.file.path
    }
    const noteId = req.body.noteId && mongoose.isValidObjectId(req.body.noteId) ? req.body.noteId : mongoose.Types.ObjectId();
    const noteCreated = await Note.findOneAndUpdate({ _id: noteId }, note, { new: true, upsert: true })
    res.status(constants.post_success).send({
      data: { note: noteCreated },
      error: null,
      status: constants.post_success,
      message: 'Notes created Sucessfully'
    })
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: 'Error in creating the Notes'
    })
  }
};

exports.getAll = async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
    const notes = await Note.find({ userAuthId: req.userAuthId }).skip((pageNumber - 1) * pageSize)
      .limit(pageSize).sort({ _id: -1 });
    const total = await Note.countDocuments({ userAuthId: req.userAuthId });
    res.status(constants.post_success).send({
      data: { notes: notes, total: total },
      error: null,
      status: constants.post_success,
      message: 'All the Notes Collected Sucessfully'
    })
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: 'Error in getting the Notes'
    })
  }
};

exports.getById = async (req, res) => {
  try {
    const notes = await Note.find({ userAuthId: req.userAuthId, _id: req.params.noteId })
    res.status(constants.post_success).send({
      data: { notes: notes },
      error: null,
      status: constants.post_success,
      message: 'Got the Note Sucessfully'
    })
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: 'Error in getting the Notes'
    })
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deleteNote = await Note.findOneAndDelete({ _id: req.params.noteId, userAuthId: req.userAuthId })
    fs.unlink(deleteNote.file, (err) => {
      if (err) throw err;
    })
    res.status(constants.post_success).send({
      data: deleteNote,
      error: null,
      status: constants.post_success,
      message: 'Notes Deleted Sucessfully'
    })
  } catch (error) {
    res.status(constants.error).send({
      data: null,
      error: error,
      status: constants.error,
      message: 'Error in deleting the Notes'
    })
  }
};
