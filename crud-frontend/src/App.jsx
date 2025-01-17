import { useState, useEffect } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";
import TableList from "./components/TableList";
import NavBar from "./components/navbar";
import axios from "axios";

// Main component of the application
function App() {
  //state is essential for creating dynamic, responsive, and interactive components in React applications.
  // State to track whether the modal is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to track the current mode of the modal, either "add" or "edit"
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/clients");
      setTableData(response.data); // Set the fetched data
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Function to handle opening the modal
  const handleOpen = (mode, client) => {
    setClientData(client);
    setModalMode(mode); // Set the mode of the modal (e.g., "add" or "edit")
    setIsOpen(true); // Set the modal to open
  };

  // Function to handle the form submission inside the modal
  const handleSumbit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        // Perform logic for "add" mode
        const response = await axios.post(
          "http://localhost:3005/api/clients",
          newClientData
        );
        console.log("Client added:", response.data); //log the response
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.error("Error adding client:", error); //Log any errors
      }
      console.log("modal mode add");
    } else {
      console.log("Updating client with ID:", clientData.id);
      try {
        const response = await axios.put(
          `http://localhost:3005/api/clients/${clientData.id}`,
          newClientData
        );
        console.log("Client updated:", response.data);
        setTableData((prevData) =>
          prevData.map((client) =>
            client.id === clientData.id ? response.data : client
          )
        );
      } catch (error) {
        console.error("Error updating client:", error); //Log any errors
      }
    }
    // Close modal and reset state
    setIsOpen(false);
  };

  // JSX that defines the UI structure of the component
  return (
    <>
      {/* NavBar component with an onOpen prop. When triggered, it calls handleOpen in "add" mode */}
      <NavBar onOpen={() => handleOpen("add")} onSearch={setSearchTerm} />
      {/* TableList component to display the main content or data of the app */}
      <TableList
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm}
      />
      {/* ModalForm component to display the modal */}
      <ModalForm
        isOpen={isOpen} // Pass the modal open/close state
        OnSubmit={handleSumbit} // Pass the submission handler
        onClose={() => setIsOpen(false)} //Handle closing the modal
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
