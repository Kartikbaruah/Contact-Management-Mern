import Contact from '../models/Contact.js';

// Create new contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone, address, designation} = req.body;

    console.log("Request Body:", req.body);

    if (!name || !email || !phone || !address || !designation?.trim()) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newContact = new Contact({ name, email, phone, address, designation });
    await newContact.save();

    return res.status(201).json(newContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    return res.status(500).json({ message: 'Server error while saving contact.' });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ message: 'Server error while fetching contacts.' });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact:', error);
    return res.status(500).json({ message: 'Server error while deleting contact.' });
  }
};

export {
  createContact,
  getAllContacts,
  deleteContact
};
