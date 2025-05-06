import { Link } from "react-router-dom";
import useGetFreelancers from "../../hooks/use_get_freelancer";
import "../users/users.css";
import TableSkeletonRow from "../../components/table_skeleton";
import { toLocalDate } from "../../../../util/common_methods";
const FreelancersList = () => {
  const freelancers = useGetFreelancers();
  return (
    <div className="max-w-1100 mx-auto mt-4">
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
          {freelancers.loading ? (
            <>
              <TableSkeletonRow />
              <TableSkeletonRow />
              <TableSkeletonRow />
            </>
          ) : (
            <>
              {freelancers.freelancer.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="circular-name">
                      {user.firstname?.charAt(0)}
                      {user.lastname?.charAt(0)}
                    </div>
                  </td>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{toLocalDate(user.created_at!)}</td>
                  <td>
                    <span
                      className={`${
                        user.is_verified ? "text-green" : "text-error-md"
                      }`}
                    >
                      {user.is_verified ? "Verified" : "Not Verified"}
                    </span>
                  </td>

                  <td>
                    <Link className="manage-btn" to={`${user.id}`}>
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
