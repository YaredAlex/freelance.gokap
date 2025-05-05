import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useGetAddress } from "../../../../hooks/use_get_address";
import { AdminInfoType } from "./admin_info_type";

export const useAdminProfile = () => {
  const authContext = useAuthContext();
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);
  const [clientInfo, setClientInfo] = useState<AdminInfoType | undefined>(
    undefined
  );
  //get user profile and adress
  const getAddress = useGetAddress();

  useEffect(() => {
    getAddress.getAddress((res) => {
      const address = res.data;
      authContext.dispatchUser({
        type: "update_profile",
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
  useEffect(() => {
    //if not initialized
    const initialize = async () => {
      if (authContext.user) {
        const info: AdminInfoType = {
          avatar: "",
          title: "",
          review: "",
          phone: "",
          email: authContext.user.email,
          name: authContext.user.firstname,
          location: Object.values(authContext.user.address || {}).toString(),
          rating: "",
          reviewCount: "",
        };

        setClientInfo(info);
      }
    };
    initialize();
  }, [authContext.user]);

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

  const accountSettings = [
    {
      title: "Email",
      info: clientInfo?.email,
      action: undefined,
      onClick: () => {},
    },
    {
      title: "Password",
      info: "••••••••",
      action: "Change",
      onClick: () => {
        setShowEditPass(() => true);
      },
    },
    {
      title: "Phone",
      info: clientInfo?.phone,
      action: "Change",
      onClick: () => {
        setShowEditPhone(true);
      },
    },
  ];

  const deviceInfo = [
    {
      title: "Current device",
      info: "Chrome on MacOS",
      action: undefined,
    },
    {
      title: "Last logged in",
      info: "April 12, 2025",
      action: undefined,
    },
  ];
  return {
    profileList,
    showEditAddress,
    setShowEditAddress,
    showEditName,
    setShowEditName,
    showEditPass,
    setShowEditPass,
    showEditPhone,
    setShowEditPhone,
    loading: getAddress.loading,
    clientInfo,
    accountSettings,
    deviceInfo,
    avatar: clientInfo?.avatar,
    name: clientInfo?.name,
    title: clientInfo?.title,
    location: clientInfo?.location,
    rating: clientInfo?.rating,
    reviewCount: clientInfo?.reviewCount,
    languages: clientInfo?.languages,
  };
};
export type AccountSettingProps = {
  title: string;
  info?: string;
  action?: string;
  onClick?: () => void;
};
export type useAdminProfileType = {
  profileList?: {
    title: string;
    value?: string | null;
    onClick: () => void;
  }[];
  accountList?: {
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
  loading: boolean;
  accountSettings: AccountSettingProps[];
  avatar?: string;
  name?: string;
  title?: string;
  location?: string;
  rating?: string;
  reviewCoun?: string;
  language?: string[];
};
