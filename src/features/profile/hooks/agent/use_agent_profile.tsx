import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";
import useAgentDetail from "./use_agent_detail";
import { useAgentContext } from "../../../../context/agent/agent_context";
import {
  AgentInfoType,
  AgentServiceProp,
  EducationProp,
} from "./types_agent_profile";
import { useChangeAgentDetail } from "./use_change_detail";

export const useAgentProfile = () => {
  const authContext = useAuthContext();
  const agentContext = useAgentContext();
  const changeAgentDetail = useChangeAgentDetail();
  const [showEditName, setShowEditName] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);
  const [showEditAbout, setShowEditAbout] = useState(false);
  const [showEditLanguage, setShowEditLanguage] = useState(false);
  const [showEditSpeciality, setShowEditSpeciality] = useState(false);
  const agentDetail = useAgentDetail();
  const [agentInfo, setAgentInfo] = useState<AgentInfoType | undefined>(
    undefined
  );

  useEffect(() => {
    agentDetail.getDetail(() => {
      console.log("called in agentProfile");
    });
  }, []);
  useEffect(() => {
    //if not initialized
    const initialize = async () => {
      if (authContext.user && agentContext.agent?.detail) {
        const info: AgentInfoType = {
          avatar: "",
          title: "",
          review: "",
          phone: "",
          email: authContext.user.email,
          name: authContext.user.firstname,
          location: Object.values(authContext.user.address || {}).toString(),
          rating: "",
          reviewCount: "",
          experience: "",
          availability: ["categories"],
          specialties: [],
          languages: agentContext.agent.detail.language,
          about: agentContext.agent.detail.bio,
          education: [
            {
              degree: "B.S.",
              institution: "Univeristy",
              year: "2006",
            },
          ],
          services: [
            {
              description: "",
              duration: "",
              name: "",
              price: "",
            },
          ],
        };

        setAgentInfo(info);
      }
    };

    initialize();
    console.log("agent info is", agentInfo);
  }, [agentContext.agent.detail, authContext.user]);

  // const profileList = [
  //   {
  //     title: "Name",
  //     value: `${authContext.user?.firstname} ${authContext.user?.lastname}`,
  //     onClick: () => {
  //       setShowEditName(true);
  //     },
  //   },
  //   {
  //     title: "Address",
  //     value: "address",
  //     onClick: () => {
  //       setShowEditAddress(true);
  //     },
  //   },
  //   {
  //     title: "Member Since",
  //     value: new Date(
  //       authContext.user?.created_at ?? Date.now()
  //     ).toDateString(),
  //     onClick: () => {},
  //   },
  // ];
  const singleUpdate = async (data: {
    bio?: string;
    skills?: string[];
    languages?: string[];
  }) => {
    await changeAgentDetail.singleEdit(data);
  };
  const accountSettings = [
    {
      title: "Email",
      info: agentInfo?.email,
      action: "Change",
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
      info: agentInfo?.phone,
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
      action: null,
    },
    {
      title: "Last logged in",
      info: "April 12, 2025",
      action: null,
    },
  ];

  return {
    showEditAddress,
    setShowEditAddress,
    showEditName,
    setShowEditName,
    showEditPass,
    setShowEditPass,
    showEditPhone,
    setShowEditPhone,
    setShowEditAbout,
    showEditAbout,
    showEditLanguage,
    setShowEditLanguage,
    showEditSpeciality,
    setShowEditSpeciality,
    accountSettings,
    deviceInfo,
    loading: agentDetail.loading || changeAgentDetail.loading,
    avatar: agentInfo?.avatar,
    name: agentInfo?.name,
    title: agentInfo?.title,
    location: agentInfo?.location,
    rating: agentInfo?.rating,
    reviewCount: agentInfo?.reviewCount,
    experience: agentInfo?.experience,
    availability: agentInfo?.availability,
    specialties: agentInfo?.specialties,
    languages: agentInfo?.languages,
    about: agentInfo?.about,
    education: agentInfo?.education,
    services: agentInfo?.services,
    singleUpdate,
  };
};
export type AccountSettingProps = {
  title: string;
  info?: string;
  action: string;
  onClick: () => void;
};
export type AgentProfileProp = {
  profileList?: {
    title: string;
    value: string;
    onClick: () => void;
  }[];
  accountList?: {
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
  loading: boolean;
  avatar?: string;
  name?: string;
  title?: string;
  location?: string;
  rating?: string;
  reviewCount?: string;
  experience?: string;
  availability?: string[];
  specialties?: string[];
  languages?: string[];
  about?: string;
  education?: EducationProp[];
  services?: AgentServiceProp[];
  accountSettings?: AccountSettingProps[];
  setShowEditAbout: React.Dispatch<React.SetStateAction<boolean>>;
  showEditAbout: boolean;
  showEditLanguage: boolean;
  setShowEditLanguage: React.Dispatch<React.SetStateAction<boolean>>;
  showEditSpeciality: boolean;
  setShowEditSpeciality: React.Dispatch<React.SetStateAction<boolean>>;
  singleUpdate: (data: {
    bio?: string;
    skills?: string[];
    languages?: string[];
  }) => void;
};
export const useChangeAgentPassword = () => {
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

export const useChangeAgentName = () => {
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
      firstname: authContext.user?.firstname,
      lastname: authContext.user?.lastname,
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
export const useChangeAgentAddress = () => {
  const { loading, sendRequest } = useAxios({
    url: `/api/user/address/`,
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

  const changeUserAddress = (data: {
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
    changeUserAddress,
    loading,
    reset,
  };
};
export const useChangeAgentPhone = () => {
  const authContext = useAuthContext();
  const { loading, sendRequest } = useAxios({
    url: `/api/user/phone/${authContext.user?.id}`,
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
    changeUserPhone,
    loading,
    reset,
  };
};
