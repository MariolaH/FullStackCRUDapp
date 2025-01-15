import { useState } from "react";
import "./App.css";
import ModalForm from "./components/ModalForm";
import TableList from "./components/TableList";
import NavBar from "./components/navbar";

// Main component of the application
function App() {
  //state is essential for creating dynamic, responsive, and interactive components in React applications.
  // State to track whether the modal is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // State to track the current mode of the modal, either "add" or "edit"
  const [modalMode, setModalMode] = useState("add");

  // Function to handle opening the modal
  const handleOpen = (mode) => {
    setIsOpen(true); // Set the modal to open
    setModalMode(mode); // Set the mode of the modal (e.g., "add" or "edit")
  };

   // Function to handle the form submission inside the modal
  const handleSumbit = () => {
    if (modalMode === "add") {
      // Perform logic for "add" mode
      console.log("modal mode Add");
    } else {
      // Perform logic for "edit" mode
      console.log("modal mode Edit");
    }
     // Close modal and reset state
     setIsOpen(false);
  };

  // JSX that defines the UI structure of the component
  return (
    <>
    {/* NavBar component with an onOpen prop. When triggered, it calls handleOpen in "add" mode */}
      <NavBar onOpen={() => handleOpen("add")} />
      {/* TableList component to display the main content or data of the app */}
      <TableList  handleOpen={handleOpen}/>
       {/* ModalForm component to display the modal */}
      <ModalForm 
      isOpen={isOpen} // Pass the modal open/close state
      onSubmit={handleSumbit} // Pass the submission handler
      onClose={() => setIsOpen(false)} //Handle closing the modal 
      mode={modalMode}
      /> 
    </>
  );
}

export default App;
