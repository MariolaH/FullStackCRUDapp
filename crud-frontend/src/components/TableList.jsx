export default function TableList() {
  const clients = [
    {
      id: 1,
      name: "Bob",
      email: "email@gmail.com",
      job: "Developer",
      rate: "100",
      isactive: true,
    },
    {
      id: 2,
      name: "Sam",
      email: "email@gmail.com",
      job: "Developer2",
      rate: "101",
      isactive: true,
    },
    {
      id: 3,
      name: "Mike",
      email: "email@gmail.com",
      job: "Developer3",
      rate: "102",
      isactive: false,
    },
  ];
  return (
    <>
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
            {clients.map((client) => {
              return (
                <tr>
                  <th>{client.id}</th>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.job}</td>
                  <td>{client.rate}</td>
                  <td>
                    <button
                      className={`btn rounded-full w-20 ${
                        client.isactive ? `btn-primary` : `btn-outline-primary`
                      }`}
                    ></button>
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
