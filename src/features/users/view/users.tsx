import { Link } from "react-router-dom";
import "./users.css";
import TableSkeletonRow from "../components/table_skeleton";
import { ButtonPrimary } from "../../../components/button/button";
import { toLocalDate } from "../../../util/common_methods";
import useGetUser from "../hooks/use_get_user";

const UserList = ({ role }: { role: "client" | "freelancer" }) => {
  const user = useGetUser({ role });

  return (
    <div className="max-w-1100 mx-auto mt-4">
      {/* search bar for searching client */}
      <div className="mb-4 bg-white-v-4 px-3 py-4 rounded border-card d-flex gap-4">
        <form
          onSubmit={(e) => user.handleSearch(e)}
          className="col d-flex gap-4"
        >
          <div className="d-flex w-100 flex-row flex-sm-row gap-2 justify-content-between ">
            <input
              type="text"
              className="custom-input border-card rounded"
              placeholder="Search by name or email"
              value={user.searchTerm}
              onChange={(e) => user.setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ maxWidth: "150px" }}>
            <ButtonPrimary
              title="search"
              type="submit"
              className="py-2"
              disabled={user.searchLoading}
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
      {/*  */}
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
          {user.loading ? (
            <>
              <TableSkeletonRow />
              <TableSkeletonRow />
              <TableSkeletonRow />
            </>
          ) : (
            <>
              {user.currentRows.map((user) => (
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
      <nav>
        <ul className="pagination">
          {user.pageList?.map((page) => (
            <li
              key={page}
              className={`page-item ${
                page === user.currentPage ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => user.goToPage(page)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default UserList;
