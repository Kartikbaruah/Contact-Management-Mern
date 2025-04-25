import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// {Get all contacts}
router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

// {Add a contact}
router.post('/', async (req, res) => {
  const newContact = new Contact(req.body);
  await newContact.save();
  res.status(201).json(newContact);
});

// {Delete contact}
router.delete('/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
