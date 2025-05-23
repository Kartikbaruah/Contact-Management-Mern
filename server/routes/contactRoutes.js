import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// {Get all contacts}
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error while fetching contacts.' });
  }
});

// {Add contact}
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, designation } = req.body;

    if (!name || !email || !phone || !address || !designation) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newContact = new Contact({ name, email, phone, address, designation });
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Server error while saving contact.' });
  }
});

// {Delete contact}
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Server error while deleting contact.' });
  }
});

export default router;