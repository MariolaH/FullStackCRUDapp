import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TableList({handleOpen, tableData, setTableData, searchTerm}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
const response = await axios.get('http://localhost:3005/api/clients')
setTableData(response.data); // set the fetched data
      } catch (err) {
        setError(err.message);
      }
  };
  fetchData();
}
  ,[]);

  //filter the tableData based on the searchTerm
  const filteredData = tableData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    if (confirmDelete) {
      console.log('Deleting client with ID:', id); // Debugging line
      try {
        const response = await axios.delete(`http://localhost:3005/api/clients/${id}`);
        console.log('Delete response:', response.data); // Debugging line
        setTableData((prevData) => prevData.filter(client => client.id !== id)); // Update state
      } catch (err) {
        console.error('Error deleting client:', err.message); // Log error
        setError(err.message); // Show error to user
      }
    }
  };
  
  


  return (
    <>
    {error && <div className='alert alert-error'>{error}</div>}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Job</th>
              <th>Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="hover">
            {/* row 1 */}
            {filteredData.map((client) => {
              return (
                <tr key={client.id}>
                  <th>{client.id}</th>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.job}</td>
                  <td>{client.rate}</td>
                  <td>
                    <button
                      className={`btn rounded-full w-20 ${
                        client.isactive ? `btn-primary` : `btn-outline btn-primary`
                      }`} 
                    > {client.isactive ? `Active` : `Inactive`}</button>
                  </td>
                  <td>
                    <button onClick={() => handleOpen('edit', client)} className="btn btn-secondary">Update</button>
                  </td>
                  <td>
                    <button className="btn btn-accent" onClick={() => handleDelete(client.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
