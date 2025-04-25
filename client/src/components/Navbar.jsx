import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const Navbar = ({ setView }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerItems = (
    <List>
      <ListItem
        button
        onClick={() => {
          setView("create");
          setDrawerOpen(false);
        }}
        sx={{
          backgroundColor: "#ba000d",
          "&:hover": {
            backgroundColor: "#ff7961",
          },
        }}
      >
        <ListItemText primary="Create" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          setView("all");
          setDrawerOpen(false);
        }}
        sx={{
          backgroundColor: "#ba000d",
          "&:hover": {
            backgroundColor: "#ff7961",
          },
        }}
      >
        <ListItemText primary="All Contacts" />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000066" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Contact Manager
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                  sx: {
                    backgroundColor: "#ba000d",
                    color: "#fff",
                    width: 200,
                  },
                }}
              >
                {drawerItems}
              </Drawer>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => setView("create")}
                sx={{
                  backgroundColor: "#ba000d",
                  ml: 1,
                  "&:hover": {
                    backgroundColor: "#ff7961",
                  },
                }}
              >
                Create
              </Button>
              <Button
                color="inherit"
                onClick={() => setView("all")}
                sx={{
                  backgroundColor: "#ba000d",
                  ml: 1,
                  "&:hover": {
                    backgroundColor: "#ff7961",
                  },
                }}
              >
                All Contacts
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
