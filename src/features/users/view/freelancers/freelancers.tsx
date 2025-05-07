import { Link } from "react-router-dom";
import "../users/users.css";
import TableSkeletonRow from "../../components/table_skeleton";
import { toLocalDate } from "../../../../util/common_methods";
import { ButtonPrimary } from "../../../../components/button/button";
import useGetUser from "../../hooks/use_get_user";
const FreelancersList = () => {
  const freelancers = useGetUser({ role: "freelancer" });
  return (
    <div className="max-w-1100 mx-auto mt-4">
      {/* search bar for searching client */}
      <div className="mb-4 bg-white-v-4 px-3 py-4 rounded border-card d-flex gap-4">
        <form
          onSubmit={(e) => freelancers.handleSearch(e)}
          className="col d-flex gap-4"
        >
          <div className="d-flex w-100 flex-row flex-sm-row gap-2 justify-content-between ">
            <input
              type="text"
              className="custom-input border-card rounded"
              placeholder="Search by name or email"
              value={freelancers.searchTerm}
              onChange={(e) => freelancers.setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ maxWidth: "150px" }}>
            <ButtonPrimary
              title="search"
              type="submit"
              className="py-2"
              disabled={freelancers.searchLoading}
            />
          </div>
        </form>
        <div
          className="border-card d-flex align-items-center px-3 rounded"
          style={{ position: "relative" }}
        >
          {/* <Filter
            onClick={() => adminBoard.setShowFilter(!adminBoard.showFilter)}
          />
          <FilterProject agentBoard={adminBoard} /> */}
        </div>
      </div>
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
              {freelancers.currentRows.map((user) => (
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
