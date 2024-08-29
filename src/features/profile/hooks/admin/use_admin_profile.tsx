import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";
import { useGetAddress } from "../../../../hooks/use_get_address";

export const useAdminProfile = () => {
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
      value: authContext.user.firstname,
      onClick: () => {
        setShowEditName(true);
      },
    },
    {
      title: "Address",
      value: authContext.user.address
        ? `${authContext.user.address.city}, ${authContext.user.address.country}`
        : "address",
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
    addressLoading: getAddress.loading,
  };
};

export type UseAdminProfileType = {
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
export const useChangeAdminPassword = () => {
  const { loading, sendRequest } = useAxios({
    url: "/api/user/change_password/",
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

export const useChangeAdminName = () => {
  const authContext = useAuthContext();
  const { loading, sendRequest } = useAxios({
    url: `/api/user/update/`,
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

  const changeUserName = (
    data: { firstname: string; lastname: string },
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "Name change success", type: "success" });
        setShow(false);
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
export const useChangeAddress = () => {
  const addressAPI = `/api/user/address/`;
  const { loading, sendRequest } = useAxios({
    url: addressAPI,
    method: "PUT",
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

  const changeAddress = (data: {
    country: string;
    state: string;
    city: string;
    zipcode: string;
  }) => {
    //validate userinput
    sendRequest(
      {
        ...data,
        zip_code: data.zipcode,
      },
      () => {
        customToast({ message: "Address change success", type: "success" });
      },
      (error) => {
        const message: { error: string } = error.response?.data as {
          error: string;
        };
        console.log(error.response?.data);

        if (message?.error === "The user has no address")
          sendRequest(
            {
              ...data,
              zip_code: data.zipcode,
            },
            () => {
              customToast({
                message: "Address change success",
                type: "success",
              });
            },
            (error) => {
              customToast({ message: error.message, type: "error" });
            },
            true,
            addressAPI,
            "POST"
          );
        else {
          customToast({ message: error.message, type: "error" });
          console.log(error);
        }
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    changeAddress,
    loading,
    reset,
  };
};
export const useChangeAdminPhone = () => {
  const authContext = useAuthContext();
  const { loading, sendRequest } = useAxios({
    url: `/api/user/update/${authContext.user.id}`,
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

  const changeUserPhone = (data: { phone: string }) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "phone change success", type: "success" });
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
    changeUserPhone,
    loading,
    reset,
  };
};
