import { useEffect, useState } from "react";
import axios from "axios";
import { Container, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        All Contacts
      </Typography>
      <List>
        {contacts.map((contact) => (
          <ListItem
            key={contact._id}
            sx={{
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
            secondaryAction={
              <IconButton edge="end" onClick={() => deleteContact(contact._id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${contact.name} (${contact.phone})`}
              secondary={`Email: ${contact.email} | Designation: ${contact.designation} | Address: ${contact.address}`}
            />
          </ListItem>
        ))}
      </List>

    </Container>
  );
};

export default ContactList;
