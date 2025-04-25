import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Container,
  Stack,
  Snackbar,
  Alert,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const countryCodes = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "Australia" },
];

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    countryCode: "+91",
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.phone.length < 9) {
      setError("Phone number must be at least 9 digits.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/contacts", form);
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        countryCode: "+91",
      });
      setOpen(true);
      setError("");
    } catch (err) {
      console.error("Error adding contact", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
            required
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            fullWidth
            required
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                label="Country Code"
                value={form.countryCode}
                onChange={(e) =>
                  setForm({ ...form, countryCode: e.target.value })
                }
                fullWidth
                required
              >
                {countryCodes.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.code} ({country.label})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                label="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                fullWidth
                required
                type="tel"
                inputProps={{ maxLength: 10 }}
                error={form.phone.length > 0 && form.phone.length < 10}
                helperText={
                  form.phone.length > 0 && form.phone.length < 10
                    ? "Phone number must be at least 9 digits"
                    : ""
                }
              />
            </Grid>
          </Grid>

          <TextField
            label="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            multiline
            rows={3}
            fullWidth
            required
          />

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
            sx={{
              backgroundColor: "#ff7961",
              "&:hover": {
                backgroundColor: "#ba000d",
              },
            }}
          >
            Add Contact
          </LoadingButton>
        </Stack>
      </form>

      {/* Snackbar for Success */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Contact Added Successfully!
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      {error && (
        <Box mt={2}>
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        </Box>
      )}
    </Container>
  );
};

export default ContactForm;
