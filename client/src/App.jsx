import { useState } from "react";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [view, setView] = useState("create");

  return (
    <>
      <Navbar setView={setView} />
      {view === "create" ? <ContactForm /> : <ContactList />}
    </>
  );
}

export default App;
