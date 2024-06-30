import { useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";

export const useClientProfile = () => {
  const authContext = useAuthContext();
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);
  const profileList = [
    {
      title: "Name",
      value: authContext.user.firstname,
      onClick: () => {
        setShowEditName(true);
      },
    },
    {
      title: "Address",
      value: "address",
      onClick: () => {
        setShowEditAddress(true);
      },
    },
    {
      title: "Member Since",
      value: new Date(authContext.user.created_at).toDateString(),
      onClick: () => {},
    },
  ];
  const accountList = [
    {
      title: "Email",
      value: authContext.user.email,
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
  };
};

export type UseClientProfileType = {
  profileList: {
    title: string;
    value: string;
    onClick: () => void;
  }[];
  accountList: {
    title: string;
    value: string;
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
export const useChangeClientPassword = () => {
  const { loading, sendRequest } = useAxios({
    url: "/api/user/change-password/",
    method: "POST",
    headers: true,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      cnfpassword: "",
      currentPassword: "",
    },
  });

  //Change password
  const changePassword = (data: { password: string; cnfpassword: string }) => {
    sendRequest(
      data,
      () => {
        customToast({ message: "Password Changed", type: "success" });
        reset();
      },
      (error) => {
        console.log(error);
        customToast({ message: error.message, type: "error" });
      }
    );
  };

  return {
    loading,
    changePassword,
    register,
    handleSubmit,
    errors,
    reset,
  };
};

export const useChangeClientName = () => {
  const authContext = useAuthContext();
  const { loading, sendRequest } = useAxios({
    url: `/api/user/update-user/`,
    method: "PATCH",
    headers: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstname: authContext.user.firstname,
      lastname: authContext.user.lastname,
    },
  });

  const changeUserName = (data: { firstname: string; lastname: string }) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "Name change success", type: "success" });
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log(error);
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    changeUserName,
    loading,
    reset,
  };
};
export const useChangeClientAddress = () => {
  const authContext = useAuthContext();
  const { loading, sendRequest } = useAxios({
    url: `/api/user/update-user/${authContext.user.id}`,
    method: "POST",
    headers: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      country: "",
      state: "",
      city: "",
      zipcode: "",
    },
  });

  const changeUserName = (data: {
    country: string;
    state: string;
    city: string;
    zipcode: string;
  }) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "Address change success", type: "success" });
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log(error);
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    changeUserName,
    loading,
    reset,
  };
};
export const useChangeClientPhone = () => {
  const authContext = useAuthContext();
  const { loading, sendRequest } = useAxios({
    url: `/api/user/update-user/${authContext.user.id}`,
    method: "POST",
    headers: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });

  const changeUserName = (data: { phone: string }) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "Address change success", type: "success" });
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log(error);
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    changeUserName,
    loading,
    reset,
  };
};
