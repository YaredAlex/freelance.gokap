import { Link } from "react-router-dom";
import useGetClients from "../../hooks/use_get_clients";
import "./users.css";
import TableSkeletonRow from "../../components/table_skeleton";
const ClientList = () => {
  const getClients = useGetClients();

  return (
    <table className="admin-table text-black-variant-1">
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Created Date</th>
          <th>Verified</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {getClients.loading ? (
          <>
            <TableSkeletonRow />
            <TableSkeletonRow />
            <TableSkeletonRow />
          </>
        ) : (
          <>
            {getClients.users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="circular-name">
                    {user.firstname.charAt(0)}
                    {user.lastname.charAt(0)}
                  </div>
                </td>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>{"Not Verified"}</td>
                <td>
                  <Link to={`${user.id}`} className="manage-btn">
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default ClientList;
