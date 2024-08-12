import { Link } from "react-router-dom";
import useGetFreelancers from "../../hooks/use_get_freelancer";
import "../users/users.css";
import TableSkeletonRow from "../../components/table_skeleton";
const FreelancersList = () => {
  const getClients = useGetFreelancers();

  return (
    <div className="max-w-1200 mx-auto ">
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
              {getClients.freelancer.map((user) => (
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
                    <Link className="manage-btn" to={`12`}>
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FreelancersList;
