import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search_bar.css";
type RouteEntry = {
  pattern: RegExp;
  link: string;
};

export type InferredRoute = {
  link: string;
  title: string;
};

export const inferTitle = (link: string): string => {
  // Remove dynamic segments and clean the path
  const parts = link
    .replace(/\/:.*$/, "") // Remove dynamic params
    .split("/")
    .filter(Boolean)
    .slice(1); // Skip the 'client' or 'freelancer' part for cleaner title
  return parts
    .map((p) => {
      if (p === "dashboard") return "Dashboard";
      if (p === "profile") return "Profile";
      if (p === "projects") return "Projects";
      if (p === "create") return "Create Project";
      if (p === "account") return "Account Settings";
      if (p === "invoice") return "Invoices";
      if (p === "support") return "Support Center";
      if (p === "status") return "Project Status";
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" > ");
};

interface SearchBarProps {
  routes?: RouteEntry[];
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const searchList = [
    {
      link: "/client/dashboard",
      title: "Dashboard",
    },
    {
      link: "/client/dashboard/account",
      title: "Profile",
    },
    {
      link: "/client/dashboard/projects/create",
      title: "Create Project",
    },
    {
      link: "/client/dashboard/projects",
      title: "All Projects",
    },
    {
      link: "/client/dashboard/account",
      title: "Account",
    },
    {
      link: "/client/dashboard/invoice",
      title: "Invoice",
    },
    {
      link: "/client/dashboard/support",
      title: "Support",
    },
    {
      link: "/client/dashboard/projects/status/:id",
      title: "Project",
    }, // dynamic route
  ];

  const filteredRoutes = searchList?.filter((route) =>
    route.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-container text-black-variant-2">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-bar-input custom-input"
          placeholder="Search pages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {query && (
        <ul className="search-results">
          {filteredRoutes?.length > 0 ? (
            filteredRoutes?.map((route, index) => (
              <li
                key={index}
                onClick={() => {
                  navigate(route.link);
                  setQuery("");
                }}
                className="search-result-item"
              >
                {route.title}
              </li>
            ))
          ) : (
            <li className="search-result-empty">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
