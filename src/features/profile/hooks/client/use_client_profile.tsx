import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useGetAddress } from "../../../../hooks/use_get_address";

export const useClientProfile = () => {
  const authContext = useAuthContext();
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);
  //get user profile and adress
  const getAddress = useGetAddress();
  useEffect(() => {
    getAddress.getAddress((res) => {
      const address = res.data;
      authContext.dispatchUser({
        type: "signin",
        payload: {
          ...authContext.user,
          address: {
            country: address.country,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
          },
        },
      });
    });
  }, []);

  const profileList = [
    {
      title: "Name",
      value: authContext.user?.firstname,
      onClick: () => {
        setShowEditName(true);
      },
    },
    {
      title: "Address",
      value: authContext.user?.address
        ? `${authContext.user.address.city}, ${authContext.user.address.country}`
        : "address",
      onClick: () => {
        setShowEditAddress(true);
      },
    },
    {
      title: "Member Since",
      value: new Date(authContext.user?.created_at as string).toDateString(),
      onClick: () => {},
    },
  ];
  const accountList = [
    {
      title: "Email",
      value: authContext.user?.email,
      onClick: () => {},
    },
    {
      title: "Phone",
      value: "-",
      onClick: () => {
        setShowEditPhone(true);
      },
    },
    {
      title: "Password",
      value: "********",
      onClick: () => {
        setShowEditPass(() => true);
      },
    },
  ];
  const deviceList = [
    {
      title: "Device",
      value: "browser",
      onClick: () => {},
    },
  ];
  return {
    profileList,
    accountList,
    deviceList,
    showEditAddress,
    setShowEditAddress,
    showEditName,
    setShowEditName,
    showEditPass,
    setShowEditPass,
    showEditPhone,
    setShowEditPhone,
    addressLoading: getAddress.loading,
  };
};

export type UseClientProfileType = {
  profileList: {
    title: string;
    value?: string | null;
    onClick: () => void;
  }[];
  accountList: {
    title: string;
    value?: string | null;
    onClick: () => void;
  }[];
  showEditAddress: boolean;
  setShowEditAddress: React.Dispatch<React.SetStateAction<boolean>>;
  showEditName: boolean;
  setShowEditName: React.Dispatch<React.SetStateAction<boolean>>;
  showEditPass: boolean;
  setShowEditPass: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditPhone: React.Dispatch<React.SetStateAction<boolean>>;
  showEditPhone: boolean;
};
