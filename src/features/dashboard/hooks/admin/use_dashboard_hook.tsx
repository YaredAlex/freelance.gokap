import { useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useAxios } from "../../../../hooks/useAxios";

const useDashBoard = () => {
  const [showNav, setShowNav] = useState(false);
  const { user } = useAuthContext();
  const { loading } = useAxios({
    url: "/api/user/profile/",
    method: "GET",
    headers: true,
  });

  return {
    loading,
    showNav,
    setShowNav,
    user,
  };
};

export default useDashBoard;
